import { createRouter, createWebHistory } from 'vue-router'

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
      }
   ]
})

export default router
