import { useEffect, useState } from "react";
import countryService from './services/Country'
import weatherService from './services/Weather'

const DataCountry = ({country, weather}) => {
  return(
  <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
      {Object.values(country.languages).map(((language, i) => 
        <li key={i}>{language}</li>
      ))}
      </ul>
      <br />
      <img src={country.flags.png} alt="" style={{width: "150px"}}/>
      <h2>Weather in {country.capital[0]}</h2>
      <p>temperature {weather.main.temp - 273} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=""/>
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const App = () => {
  const [allCountries, setAllContries] = useState([])
  const [selectedCountries, setSelectedCountries] =  useState([])
  const [country, setCountry] = useState('')
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    countryService
      .getAll()
      .then((returnedData) => {
        setAllContries(returnedData)
      })
  }, [])
  
  useEffect(() => {
    if(selectedCountries.length === 1){
      handleShowCountry(selectedCountries[0])
    }else if(selectedCountries.length < 10){
      setMessage(selectedCountries.map((sCountry, i) => 
        <div key={i}>
          {sCountry.name.common} &nbsp;
          <button onClick={() => handleShowCountry(sCountry)}>show</button>
          <br />
        </div>
      ))
    }else{
      setMessage('Too many matches, specify another filter')
    }
  }, [selectedCountries]);
  
  const handleCountry = (event) => {
    event.preventDefault()
    setCountry(event.target.value)
    setSelectedCountries(allCountries.filter(afterValue => 
        afterValue.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    )
  }
  
  const handleShowCountry = (country) => {
    weatherService
      .get(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
      .then(response => {
        setMessage(
          <DataCountry country={country} weather={response}/>
        )}
      )
    
  }
  return (
    <div>
      <pre>find countries&nbsp;
        <input value={country} onChange={handleCountry}/>
        <br/>
        {message}
      </pre>
    </div>
  )
}

export default App;
