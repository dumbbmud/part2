const AddNotification = ({addMessage}) => {
    if (addMessage === null){
        return null
    }
    return(
        <div className="addNotif">
            {addMessage}
        </div>
    )
}
export default AddNotification
