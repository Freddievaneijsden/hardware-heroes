<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuth } from '@/composables/loginStatus.js'

const { token, user, logout } = loginStatus()

const token = ref(null)
const user = ref(null)

onMounted(() => {
  const storedToken = localStorage.getItem('token')
  const storedUser = localStorage.getItem('user')

  if (storedToken && storedUser) {
    token.value = storedToken
    user.value = JSON.parse(storedUser)
  }
})

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
</script>

<template>
  <div>
    <button>{{ user?.userName || 'User' }}</button>
    <button @click="logout">Logout</button>
  </div>
</template>
