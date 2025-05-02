import axios from 'axios'
import { useEffect, useState } from 'react'
import contactServices from './services/contacts'

const PhonebookDisplay = ({persons}) =>{
  return (
    <p>{persons.name} {persons.number} </p>
    
  )
}

const DisplaySearch = ({x}) => <div>{x.name}</div>

const Filter = ({handleSearch, search, searchResult}) => {
  return(
  <>
  <div>filter shown with: <input onChange={handleSearch} value={search}/></div>    
  <br/>
  {search.length > 0 ? searchResult.map(x => <strong><DisplaySearch key={x.id} x={x}/></strong>) : null}
  <br/>
  </>
  )
}

const PersonForm = ({addPerson, handleNewName, newName, handleNewNumber, newNumber}) => {
  return(
  <form onSubmit={addPerson}>
    <div>name: <input onChange={handleNewName} value={newName}/></div>
    <br/>
    <div>number: <input onChange={handleNewNumber} value={newNumber}/></div>
    <br/>
    <div>
    <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons}) => {
  return(
  persons.map(x => 
    <PhonebookDisplay key={x.id} persons={x} />
  )
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(()=>{
    contactServices
      .getAll()
      .then(presentContacts => setPersons(presentContacts))

  }, [])


  const handleNewName = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) =>{
    setNewNumber(event.target.value)
  }

  const addPerson = (event) =>{
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    let present = false
    persons.map((x) => {
    if (x.name === newName){
      alert(`${newName} is already added to the phonebook`)
      present = true
    }}
    )
    if (!present){
      contactServices
        .add(personObject)
        .then(returnedContacts =>
          setPersons(persons.concat(returnedContacts))
        )
    }
    setNewName('')
    setNewNumber('')

  }

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase())  
  } 

  const searchResult = persons.filter((x) =>
    x.name.toLowerCase().includes(search)
  )


  console.log("search here", searchResult)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} search={search} searchResult={searchResult}/>
      <h3>Add a new contact</h3>
      <PersonForm addPerson={addPerson} handleNewName={handleNewName} newName={newName} handleNewNumber={handleNewNumber} newNumber={newNumber}/>
      <h3>Numbers</h3>
      <Persons persons={persons}/>
    </div>
  )
}

export default App