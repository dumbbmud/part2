import Note from "./Note"
import Total from "./Total"

const Course = ({course}) => {
    return (
        <>
            <h1>{course.name}</h1>
            
            {course.parts.map(x =>
                <Note key={x.id} note={x} />
            )}

            <Total parts={course.parts}/>
        
        </>
    )
}


    
export default Course