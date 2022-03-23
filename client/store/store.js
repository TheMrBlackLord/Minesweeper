import { createStore } from 'vuex'
import api from '../http/api'

const store = createStore({
   state: {
      difficulties: {
        easy: {size: 10, bombs: 20, cellSize: 40, fontSize: 25},
        medium: {size: 15, bombs: 45, cellSize: 30, fontSize: 22},
        hard: {size: 20, bombs: 80, cellSize: 25, fontSize: 18},
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
      }
   },
   actions: {
      pushError({commit}, error) {
         commit('addError', error)
      },
      removeError({commit}, index) {
         commit('removeError', index)
      },
      async login({commit}, user) {
         try {
            const response = await api.post('/auth/login', user)
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
      }
   }
})

export default store
