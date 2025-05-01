// import Curriculum from "./components/Curriculum"

// const App = () => {
//   const courses = [
//     {
//       name: 'Half Stack application development',
//       id: 1,
//       parts: [
//         {
//           name: 'Fundamentals of React',
//           exercises: 10,
//           id: 1
//         },
//         {
//           name: 'Using props to pass data',
//           exercises: 7,
//           id: 2
//         },
//         {
//           name: 'State of a component',
//           exercises: 14,
//           id: 3
//         },
//         {
//           name: 'Redux',
//           exercises: 11,
//           id: 4
//         }
//       ]
//     }, 
//     {
//       name: 'Node.js',
//       id: 2,
//       parts: [
//         {
//           name: 'Routing',
//           exercises: 3,
//           id: 1
//         },
//         {
//           name: 'Middlewares',
//           exercises: 7,
//           id: 2
//         }
//       ]
//     }
//   ]

//   return <Curriculum courses={courses} />
// }

// export default App

import axios from 'axios'
import { useEffect, useState } from 'react'

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
    axios.get('http://localhost:3001/persons')
    .then(response =>{
      console.log("promise fulfilled")
      setPersons(response.data)
    })
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
      id: persons.length + 1
    }
    let present = false
    persons.map((x) => {
    if (x.name === newName){
      alert(`${newName} is already added to the phonebook`)
      present = true
    }}
    )
    if (!present){
    setPersons(persons.concat(personObject))}
    setNewName('')
    setNewNumber('')

  }

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase())
    // searchResult = persons.filter((x) =>
    // x.name.toLowerCase().includes(search)
    // )
    // console.log("search", searchResult)
    // return (
    //   searchResult.map((x) => <DisplaySearch key={x.id} x={x} />)
    // )  
  } 

  const searchResult = persons.filter((x) =>
    x.name.toLowerCase().includes(search)
  )


  console.log("search here", searchResult)

  return (
    // <div>
    //   <h3>Phonebook</h3>
    //   <div>filter shown with: <input onChange={handleSearch} value={search}/></div>    
    //   <br/>
    //   {search.length > 0 ? searchResult.map(x => <strong><DisplaySearch key={x.id} x={x}/></strong>) : null}
    //   <br/>
    //   <form onSubmit={addPerson}>
    //       <div>name: <input onChange={handleNewName} value={newName}/></div>
    //       <br/>
    //       <div>number: <input onChange={handleNewNumber} value={newNumber}/></div>
    //       <br/>
    //     <div>
    //       <button type="submit">add</button>
    //     </div>
    //   </form>
    //   <h3>Numbers</h3>
    //   {persons.map(x => 
    //     <PhonebookDisplay key={x.id} persons={x} />
    //   )}
    // </div>
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