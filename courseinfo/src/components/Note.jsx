const Note = ({note, toggleImp}) =>{
  
  const label = note.important ? "make not important" : "make important"

    return (
      <li className="note">
      {note.content + "  "}
      <button onClick={toggleImp}>{label}</button>
      </li>
    )
  }

export default Note