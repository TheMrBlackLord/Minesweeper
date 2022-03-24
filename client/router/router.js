import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/store'

const router = createRouter({
   history: createWebHistory(),
   routes: [
      {
         path: '/',
         name: 'home',
         component: () => import('../src/components/minesweeper/Minesweeper.vue')
      },
      {
         path: '/login',
         name: 'login',
         component: () => import('../src/components/auth/Login.vue')
      },
      {
         path: '/register',
         name: 'register',
         component: () => import('../src/components/auth/Register.vue')
      },
      {
         path: '/profile',
         name: 'profile',
         component: () => import('../src/components/user/Profile.vue'),
      }
   ]
})

router.beforeEach((to, from, next) => {
   store.dispatch('clearErrors')
   if (['login', 'register'].includes(to.name) && store.state.user) {
      next({ name: 'home' })
   }
   else {
      next()
   }
})

export default router
