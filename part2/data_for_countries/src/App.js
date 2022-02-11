import axios from "axios"
import { useState, useEffect } from 'react'

const View = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map(language =>
          <li>{language}</li>)}
      </ul>
      <img src={Object.values(country.flags)[0]} alt="flag" />
    </>
  )
}

const Countries = ({ countriesToShow }) => {
  const [click, setClick] = useState('')

  if (countriesToShow.length > 10)
    return (<div>Too many matches, specify another filter</div>)
    
  if (countriesToShow.length === 1) {
    return (
      <>
        {countriesToShow.map(country =>
          <View country={country} />
        )}
      </>
    )
  } else {
    return (
      <div>
        {countriesToShow.map(country =>
          <div key={country.fifa}>
            {country.name.common}
            <button onClick={() => setClick(country.name.common)}>show</button>
            {click === country.name.common && (
              <View country={country} />
            )}
          </div>
        )}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState('')

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = newCountry
    ? countries.filter(country => country.name.common.toLowerCase().includes(newCountry))
    : []


  return (
    <div>
      <div >
        find countries <input value={newCountry} onChange={handleCountryChange} />
      </div>
      <Countries countriesToShow={countriesToShow} />

    </div>
  );
}

export default App;
