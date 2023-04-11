import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({filterName, handleFilterName}) => {
    return(
    <div>
      filter shown with <input
        value={filterName}
        onChange={handleFilterName}
      />
    </div>
    )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input 
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input 
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const Persons = ({persons, filterName}) => {
  return(
  <div>
    {persons
      .filter(({name}) => name.toLowerCase().includes(filterName.toLowerCase()))
      .map(({name, number, id}) => 
      <p key={id}>{name} {number}</p>
    )}
  </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setnewNumber(event.target.value)
  }
  
  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if(!persons.find(({name}) => name === newName)){
      setPersons(persons.concat(person))
      setNewName('')
      setnewNumber('')
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter 
        filterName={filterName}
        handleFilterName={handleFilterName}
      />
      
      <h2>Add a new</h2>
      
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      
      <Persons 
        persons={persons}
        filterName={filterName}
      />
    </div>
  )
}

export default App