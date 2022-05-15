import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'


const App = () => {
  const [persons, setPersons] = useState([])

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
      const nameObject = {
        name: newName,
        number: newPhone,
        id: (persons.length + 1)
      }

      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewPhone('')
  }

  const deletePerson = (person) =>{
    const confirm = window.confirm(`Do you want to delete ${person.name} phone?`)

    if(confirm){
      personService
      .deletePerson(person.id)
      .then(persons2 =>{
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