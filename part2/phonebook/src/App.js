import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  
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