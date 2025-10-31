import { ref, watch } from 'vue'
import router from '@/router/index.js'

const token = ref(localStorage.getItem('token') || null)
const user = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)


watch([token, user], ([newToken, newUser]) => {
  if (newToken && newUser) {
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
  } else {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
})

const logout = () => {
  token.value = null
  user.value = null
  localStorage.removeItem('welcomeShown')
  router.push('/').then(() => {
      window.location.reload()
    })
}

export function useAuth() {
  return { token, user, logout }
}
