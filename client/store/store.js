import { createStore } from 'vuex'
import api from '../http/api'

const store = createStore({
   state: {
      difficulties: {
        easy: {size: 10, bombs: 10, cellSize: 40, fontSize: 25},
        medium: {size: 15, bombs: 35, cellSize: 30, fontSize: 22},
        hard: {size: 20, bombs: 60, cellSize: 25, fontSize: 18},
      },
      user: null,
      errors: [],
   },
   getters: {
      difficulties(state) {
         return state.difficulties
      },
      user(state) {
         return state.user
      },
      errors(state) {
         return state.errors
      }
   },
   mutations: {
      setUser(state, user) {
         state.user = user
      },
      addError(state, error) {
         state.errors.push(error)
      },
      removeError(state, index) {
         state.errors = state.errors.filter((_, i) => i !== index)
      },
      clearErrors(state) {
         state.errors = []
      }
   },
   actions: {
      pushError({commit}, error) {
         commit('addError', error)
      },
      removeError({commit}, index) {
         commit('removeError', index)
      },
      clearErrors({commit}) {
         commit('clearErrors')
      },
      async fetchUser({commit}) {
         const token = localStorage.getItem('token')
         if (token) {
            const {data: user} = await api.get('/user/me', {
               headers: {
                  'Authorization': `Bearer ${token}`
               }
            })
            commit('setUser', user)
         }
      },
      async login({commit}, user) {
         commit('clearErrors')
         try {
            const response = await api.post('/auth/login', user)
            commit('setUser', response.data.user)
            localStorage.setItem('token', response.data.tokens.accessToken)
         } catch (e) {
            commit('addError', e.response.data.message)
         }
      },
      async register({commit}, user) {
         commit('clearErrors')
         try {
            const response = await api.post('/auth/register', user)
            commit('setUser', response.data.user)
            localStorage.setItem('token', response.data.tokens.accessToken)
         } catch (e) {
            const data = e.response.data
            if (data.errors.length > 0) {
               data.errors.forEach(error => {
                  commit('addError', error.msg)
               })
            }
            else {
               commit('addError', data.message)
            }
         }
      },
      async logout({commit}) {
         localStorage.removeItem('token')
         commit('setUser', null)
         await api.post('/auth/logout')
      },
      async win(_, game) {
         await api.post('/user/game/win', game, {
            headers: {
               'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
         })
      },
      async defeat(_, game) {
         await api.post('/user/game/defeat', game, {
            headers: {
               'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
         })
      },
      async saveChanges({commit}, changes) {
         try {
            for (const [id, updates] of Object.entries(changes)) {
               await api.patch('/admin/updateuser', {id, updates}, {
                  headers: {
                     'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
               })
            }
         } catch(e) {
            const data = e.response.data
            if (data.errors.length > 0) {
               data.errors.forEach(error => {
                  commit('addError', error.msg)
               })
            } else {
               commit('addError', data.message)
            }
         }
      }
   }
})

export default store
