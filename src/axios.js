import axios from 'axios'

const API_URL = process.env.API_URL || 'http://localhost:8000/api'

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token,
        // 'Access-Control-Allow-Origin': 'http://localhost:8000',
        // 'Access-Control-Allow-Credentials': true,
        // 'Access-Control-Expose-Headers': FooBar,
    }
})