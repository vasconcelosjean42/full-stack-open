import axios from "axios"

const get = (lat, lon) => {
    const api_key = process.env.REACT_APP_API_KEY
    const request =  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {get}