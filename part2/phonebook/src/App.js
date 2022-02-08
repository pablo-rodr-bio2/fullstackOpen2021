import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      phone: '666 666 666'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.findIndex(person => person.name === newName) === -1) {
      const nameObject = {
        name: newName,
        phone: newPhone
      }
      setPersons(persons.concat(nameObject))
    } else {
        window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewPhone('') 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <div> {person.name} {person.phone} </div>
      )}
    </div>
  )
}

export default App