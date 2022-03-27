import axios from 'axios'
import store from '../store/store'

const api = axios.create({
   baseURL: process.env.VUE_APP_API_URL,
   headers: {
      'Content-Type': 'application/json'
   },
   withCredentials: true
})

// refresh access token if it expires
api.interceptors.response.use(null, async error => {
   const originalRequest = error.config
   if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const { data } = await api.post(`/auth/refresh`)
            localStorage.setItem('token', data.tokens.accessToken)
            store.commit('setUser', data.user)
            return api.request(originalRequest)
        } catch (e) {
            console.warning('Not authorized')
        }
   }
   return Promise.reject(error)
})


export default api
