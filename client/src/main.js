import { createApp } from 'vue'
import App from './App.vue'
import router from '../router/router'
import store from '../store/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './styles/style.scss'

store.dispatch('fetchUser')
   .catch(error => console.error(error))
   .finally(() => {
      const app = createApp(App)
      app.config.unwrapInjectedRef = true
      app.use(router)
      app.use(store)
      app.mount('#app')
   })


