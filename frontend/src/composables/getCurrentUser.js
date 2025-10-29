import { ref } from 'vue'

const userId = ref(null)
const userName = ref(null)
const roleId = ref(null)

const loadUser = () => {
  try {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      userId.value = parsedUser.userId
      userName.value = parsedUser.userName
      roleId.value = parsedUser.rolesId
    }
  } catch (err) {
    console.error('Failed to load user from storage:', err)
  }
}

export function getCurrentUser() {
  loadUser();
  return { userId, userName, roleId }
}