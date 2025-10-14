import { ref, watch, onMounted } from 'vue'

const token = ref(null)
const user = ref(null)

export function useAuth() {
  // Ladda in från localStorage när appen startar
  onMounted(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  })

  // Ta bort ur localStorage vid utloggning
  watch(token, (newToken) => {
    if (!newToken) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  })

  const logout = () => {
    token.value = null
    user.value = null
  }

  const login = (newToken, newUser) => {
    token.value = newToken
    user.value = newUser
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  return { token, user, login, logout }
}
