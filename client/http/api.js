import axios from 'axios'

const api = axios.create({
   baseURL: process.env.VUE_APP_API_URL,
   headers: {
      'Content-Type': 'application/json'
   },
   withCredentials: true
})

export default api
