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
         component: () => import('../src/components/auth/Login.vue'),
         meta: {
            redirectLoggedIn: true
         }
      },
      {
         path: '/register',
         name: 'register',
         component: () => import('../src/components/auth/Register.vue'),
         meta: {
            redirectLoggedIn: true
         }
      },
      {
         path: '/profile',
         name: 'profile',
         component: () => import('../src/components/user/Profile.vue'),
         meta: {
            requiresAuth: true
         }
      },
      {
         path: '/admin',
         name: 'admin',
         component: () => import('../src/components/admin/AdminPanel.vue'),
         meta: {
            requiresAuth: true,
            adminOnly: true
         }
      }
   ]
})

router.beforeEach(async (to, from, next) => {
   store.dispatch('clearErrors')
   if (to.meta.redirectLoggedIn && store.state.user) {
      next({ name: 'home' })
   }
   else if (to.meta.requiresAuth && !store.state.user) {
      next({ name: 'login' })
   }
   else if (to.meta.requiresAuth && to.meta.adminOnly &&
      store.state.user?.role !== 'admin') {
         next({ name: 'home' })
   }
   else {
      next()
   }
})

export default router
