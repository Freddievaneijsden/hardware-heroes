import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AllComponentsView from '@/views/AllComponentsView.vue'
import HardwareKnowledgeView from '@/views/HardwareKnowledgeView.vue'
import LoginView from '@/views/LoginView.vue'
import QuizView from '@/views/QuizView.vue'
import AllQuestionsView from '@/views/AllQuestionsView.vue'
import StatisticsView from '@/views/StatisticsView.vue'

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
      path: '/HardwareQuiz',
      name: 'HardwareQuiz',
      component: QuizView,
      children: [
        {
          path: 'questions',
          component: AllQuestionsView,
        }
      ]
    },
     {
      path: '/Statistics',
      name: 'Statistics',
      component: StatisticsView,
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
  ],
})

export default router
