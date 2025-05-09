import { useEffect, useState } from 'react'
import AddNotification from './components/AddNotification'
import contactServices from './services/contacts'
import ErrorNotification from './components/ErrorNotification'

const PhonebookDisplay = ({persons, remove}) =>{
  return (
    <p>
      {persons.name} {persons.number} 
      <button onClick={() => remove(persons.id)}>delete</button>
    </p>
    
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

const Persons = ({persons, remove}) => {
  return(
  persons.map(x => 
    <PhonebookDisplay key={x.id} persons={x} remove={remove} />
  )
  )
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [addMessage, setAddMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      // go to the id and change it to the new person object
      present = true
      const confirmReplace = window.confirm(`${newName} is already added to the phonebook. Do you want to replace it with this new number?`)
      
      if (confirmReplace){
      contactServices
      .replace(x.id, personObject)
      .then(returnData => {setPersons(returnData)
      setAddMessage(`${personObject.name}'s number has been updated`)
      setTimeout(() => setAddMessage(null), 3000)})
      .catch(error => setErrorMessage(`The contact ${personObject.name} is no longer in the contacts`))
      }

    }}
    )
    if (!present){
      contactServices
        .add(personObject)
        .then(returnedContacts =>
          setPersons(persons.concat(returnedContacts))
        )
        setAddMessage(`${personObject.name} has been added`)
        setTimeout(() => setAddMessage(null), 3000)
      }   
    setNewName('')
    setNewNumber('')

  }


  const remove = (id) =>{
    contactServices.remove(id)
    .then(returnedContacts =>
      setPersons(returnedContacts)
    )
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
      <AddNotification addMessage={addMessage}/>
      <ErrorNotification errorMessage={errorMessage}/>
      <PersonForm addPerson={addPerson} handleNewName={handleNewName} newName={newName} handleNewNumber={handleNewNumber} newNumber={newNumber}/>
      <h3>Numbers</h3>
      <Persons persons={persons} remove={remove}/>
    </div>
  )
}

export default App