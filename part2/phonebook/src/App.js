import { useEffect, useState } from 'react'
import personService from './services/persons'

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


const Persons = ({persons, filterName, handleDelete}) => {
  return(
  <div>
    {persons
      .filter(({name}) => name.toLowerCase().includes(filterName.toLowerCase()))
      .map(({name, number, id}) => 
      <div key={id}>
        {name}&nbsp;
        {number}&nbsp;
        <button onClick={() => {
          if(window.confirm(`Delete ${name} ?`))
            handleDelete(id)
        }}>
        deleted
        </button>
      </div>
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
    personService
      .getAll()
      .then(initialPerson => {
        console.log(initialPerson)
        setPersons(initialPerson)
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
    }
    if(!persons.find(({name}) => name === newName)){
      personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      setNewName('')
      setnewNumber('')
    }else{
      if(window.confirm(`
        ${person.name} is already added to phonebook, replace the old number with a new one?
      `)){
        const id = persons.filter(person => person.name === newName)[0].id
        personService
          .update(id, person)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === id ? returnedPerson : person))
          })
      }
    }
    
  }
  
  const deletePerson = (id) => {
    console.log(`deleted ${id}`)
    personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
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
        handleDelete={deletePerson}
      />
    </div>
  )
}

export default App