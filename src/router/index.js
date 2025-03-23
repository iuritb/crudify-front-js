import { createRouter, createWebHistory } from 'vue-router'

// Defina suas rotas
const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue') // Lazy loading do componente
  },
  {
    path: '/about',
    name: 'UserPage',
    component: () => import('../views/UserPage.vue')
  }
]

// Cria a instância do router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
