import { useEffect, useState } from "react"
import countryServices from "./services/rest-countries"

const DisplayResult = ({countryResult}) => {
  if (Array.isArray(countryResult)){
  return (
    countryResult.length > 1 ? countryResult.map((x, i)=><div key={i}>{x.name.common}</div>) : <div> {typeof countryResult[0] === "string"
      ? countryResult[0]
      : countryResult[0]?.name?.common}</div>
  )}
  else {
    console.log("tadaaaa")
    return(
      <div>
        <h1>{countryResult.name}</h1>
        <h2>Capital</h2>
        <p>{countryResult.capital}</p>
        <h2>Language(s)</h2>
        <ul>{Object.entries(countryResult.languages).map(([code, name]) =>
          <li key={code}>{name}</li>
        )}
        </ul>
        <h2>Area</h2>
        <p>{countryResult.area}</p>
        <h2>Flag</h2>
        <img src={countryResult.flag}/>
      </div>
    )
  }
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [countryQuery, setCountryQuery] = useState("")

  useEffect(()=>{
    countryServices
    .getAll()
    .then(allcountries=>setCountries(allcountries))
  }, []
  )

  const handleCountryQuery= (event) =>{
    setCountryQuery(event.target.value)
  }
  
  const countryResult = () => {
    console.log("here")
    const result = countries.filter((x)=>x.name.official.toLowerCase().includes(countryQuery.toLowerCase()) || x.name.common.toLowerCase().includes(countryQuery.toLowerCase()))
    if (result.length > 10) {
     return ["Too many matches, specify another filter"]
    } 
    else if (result.length === 1){
      const country = result[0]
      return {
        name: country.name.common,
        capital: country.capital,
        area: country.area,
        languages: country.languages,
        flag: country.flags.png
      }
    }
    return result
  }



  return (
    <div>
      <div>find countries<input onChange={handleCountryQuery} value={countryQuery}/></div>
      <DisplayResult countryResult={countryResult()}/>
    </div>
  )
}

export default App
