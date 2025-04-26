import Note from "./Note"

const Course = ({course}) => {
    return (
        <>
            <h1>{course.name}</h1>
            {course.parts.map(x =>
                <Note key={x.id} note={x} />
            )}
        </>
    )
}


    
export default Course