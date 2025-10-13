import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AllComponentsView from '@/views/AllComponentsView.vue'
import HardwareKnowledgeView from '@/views/HardwareKnowledgeView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/HardwareKnowledge',
      name: 'HardwareKnowledge',
      component: HardwareKnowledgeView,
      children: [
        {
          path: 'components',
          component: AllComponentsView,
        }
      ]
    },
  {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    
  
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import('../views/SignUpView.vue'),
    },
    {
    }
  ],
})

export default router
