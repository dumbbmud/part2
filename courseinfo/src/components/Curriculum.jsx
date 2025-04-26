import Course from "./Course"

const Curriculum = ({courses}) =>{
    return(
        <>   
            <h1>Web Development Curriculum</h1>
            {courses.map(x => 
                <Course key={x.id} course={x} />
            )}
        </>
    )
}

export default Curriculum