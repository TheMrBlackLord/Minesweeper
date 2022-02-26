import { createStore } from 'vuex'

const store = createStore({
   state: {
      difficulties: {
        easy: {size: 10, bombs: 20, cellSize: 40, fontSize: '25px'},
        medium: {size: 15, bombs: 45, cellSize: 30, fontSize: '22px'},
        hard: {size: 20, bombs: 80, cellSize: 25, fontSize: '18px'},
      }
   },
   getters: {
      getDifficulty(state) {
         return state.difficulties
      }
   },
   mutations: {},
   actions: {}
})

export default store