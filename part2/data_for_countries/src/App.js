import axios from "axios"
import { useState, useEffect } from 'react'

const View = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState()
  const [icon, setIcon] = useState()

  useEffect(() => {
    axios
      .get('http://api.openweathermap.org/data/2.5/weather?', {
        params: {
          lat: country.capitalInfo.latlng[0],
          lon: country.capitalInfo.latlng[1],
          units: 'metric',
          appid: api_key
        }
      })
      .then(response => {
        setWeather(response.data)
        setIcon(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)

      })
  }, [country.capitalInfo.latlng, api_key])

  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language} >{language}</li>)}
      </ul>
      <img src={Object.values(country.flags)[0]} alt="flag" />
      <h4>Weather in {country.capital}</h4>
      {weather && (
        <>
          <div>temperature {weather.main.temp} Celsius</div>
          <img src={icon} alt={weather.weather[0].description}></img>
          <div>wind {weather.wind.speed} m/s</div>
        </>
      )}


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
          <View key={country.flag} country={country} />
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
