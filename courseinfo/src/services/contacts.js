import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    // console.log("djhja", request.then(response => response.data))
    return request.then(response => response.data)
}

const add = (newContact) => {
    const request = axios.post(baseUrl, newContact)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(baseUrl+"/"+id)
    .then(() => axios.get(baseUrl))
    return request.then(response => response.data)
    // return request.then(response => response.data)
}

export default {getAll, add, remove}