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

import { useState } from 'react'

const PhonebookDisplay = ({persons}) =>{
  return (
    <p>{persons.name} {persons.number} </p>
    
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      number: newNumber
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

  console.log("array", persons)

  return (
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit={addPerson}>
          <div>name: <input onChange={handleNewName} value={newName}/></div>
          <br/>
          <div>number: <input onChange={handleNewNumber} value={newNumber}/></div>
          <br/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(x => 
        <PhonebookDisplay key={persons.indexOf(x)} persons={x} />
      )}
    </div>
  )
}

export default App