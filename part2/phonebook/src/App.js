import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  
  // states and setStates 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  // handler for name component controller
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // handler for phone component controller
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  //handler for filter component controller
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // control submit function:
  // checks if the person name is already in the Array
  // if it is, it pops an alert
  // if it's not, creates a new object with persons params 
  // and pushes to persons Array
  // in the end, it resets both imnputs
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.findIndex(person => person.name === newName) === -1) {
      const nameObject = {
        name: newName,
        phone: newPhone,
        id: (persons.length + 1)
      }
      setPersons(persons.concat(nameObject))
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewPhone('')
  }

  // new array to store persons, using filter
  // if filter exists in person name, it filter
  // else, it just returns persons
  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with<input value={filter} onChange={handleFilterChange}/>
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <div key={person.id}> {person.name} {person.phone} </div>
      )}
    </div>
  )
}

export default App