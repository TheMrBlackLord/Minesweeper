import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
   history: createWebHistory(),
   routes: [
      {
         path: '/',
         name: 'home',
         component: () => import('../src/components/minesweeper/Minesweeper.vue')
      }
   ]
})

export default router