import persons from "../services/persons"

const Person = ({ person, deletePerson }) => {

  return(
    // <>
    // {personsToShow.map(person =>
    //   <div key={person.id}> {person.name} {person.number} </div>
    // )}
    // </>
    <li id={person.id}>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </li>
  )
}

export default Person