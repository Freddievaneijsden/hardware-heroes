import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AllComponentsView from '@/views/AllComponentsView.vue'
import HardwareKnowledgeView from '@/views/HardwareKnowledgeView.vue'
import LoginView from '@/views/LoginView.vue'
import QuizView from '@/views/QuizView.vue'
import AllQuestionsView from '@/views/AllQuestionsView.vue'
import StatisticsView from '@/views/StatisticsView.vue'
import AboutView from '@/views/AboutView.vue'
import ProfileView from '@/views/SettingsView.vue'

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
    path: '/settings',
    name: 'settings',
    component: ProfileView,
  },
    
  
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('user')

  if (to.path==='/hardwareQuiz' && !isLoggedIn) {
    alert('You need to be logged in to take a quiz')
    next(false)
  }
  else {
    next()
  }
})

export default router
