import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    noteService
        .getAll()
        .then(presentNotes => setNotes(presentNotes))
  }, [])

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService
    .create(noteObject)
    .then(returnedNotes => 
        setNotes(notes.concat(returnedNotes))
    )
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImpOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
    .update(id, changedNote)
    .then(returnedNotes => 
        setNotes(notes.map(note => note.id === id ? returnedNotes : note ))
    )
    .catch(error => {
        console.log("the errorr is: ", error )
        alert(
            `the note ${note.content} was already deleted from server`)
        setNotes(notes.filter(n => n.id !== id))    
    }
    )
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)
  console.log("notes", notesToShow)
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} 
          note={note}
          toggleImp={()=> toggleImpOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App