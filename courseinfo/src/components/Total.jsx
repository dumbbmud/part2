const Total = ({parts}) =>{
    
    const total = parts.reduce(
        (accumulator, current) =>accumulator + current.exercises, 
        0)
    
    
    
        return (
        <p><strong>total of {total} exercises</strong></p>
    )
}

export default Total