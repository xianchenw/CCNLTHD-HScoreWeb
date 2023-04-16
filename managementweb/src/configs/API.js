import axios from 'axios'

export let endpoints = {
    'subjects': '/subjects/',
    'login': '/o/token/'
}
export default axios.create({
    baseURL: "http://127.0.0.1:8000"
})
