import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [createdMessage, setCreatedMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.findIndex(person => person.name === newName) === -1) {

      const newPerson = {
        name: newName,
        number: newPhone,
        id: (persons.length + 2)
      }
      
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setCreatedMessage(`Added ${returnedPerson.name} to phonebook`)
          setTimeout(() => {
            setCreatedMessage('')
          }, 5000)
          setPersons(persons.concat(returnedPerson))
        })

    } else {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (confirm) {
        const updatedPerson = persons.find(person => person.name === newName)
        updatedPerson.number = newPhone
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setCreatedMessage(`Updated ${returnedPerson.name} to ${returnedPerson.number}`)
            setTimeout(() => {
              setCreatedMessage('')
            }, 5000)
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
          })
          .catch(error => {
            setCreatedMessage(`${newName} was already deleted`)
            setTimeout(() => {
              setCreatedMessage('')
            }, 5000)

          })
      }
    }
    setNewName('')
    setNewPhone('')
  }

  const deletePerson = (person) => {
    const confirm = window.confirm(`Do you want to delete ${person.name} phone?`)

    if (confirm) {
      personService
        .deletePerson(person.id)
        .then(persons2 => {
          setPersons(persons2)
        })
    }

  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter))
    : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={createdMessage} />
      <div>
        filter shown with<input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>Add a new contact</h2>
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
      <ul>
        {personsToShow.map(person =>
          <Person person={person} deletePerson={() => deletePerson(person)} />)}
      </ul>
    </div>
  )
}

export default App