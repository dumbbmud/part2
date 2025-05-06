const ErrorNotification = ({errorMessage}) => {
    if (errorMessage === null){
        return null
    }
    return(
        <div className="errorNotif">
            {errorMessage}
        </div>
    )
}

export default ErrorNotification