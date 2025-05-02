const Note = ({note, toggleImp}) =>{
  
  const label = note.important ? "make not important" : "make important"

    return (
      <li>
      {note.content + "  "}
      <button onClick={toggleImp}>{label}</button>
      </li>
    )
  }

export default Note