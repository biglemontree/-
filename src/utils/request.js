import axios from 'axios'

const service = axios.create({
    baseURL,
    method: 'post',
    timeout: 15000
})