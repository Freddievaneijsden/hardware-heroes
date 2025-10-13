<script setup>
import { ref } from 'vue'

const userName = ref(null)
const userPassword = ref(null)
const success = ref(false)
const error = ref(false)

const validLogin = async () => {
  success.value = false
  error.value = false

  try {
    const response = await fetch(`http://localhost:3000/login/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName.value,
        userPassword: userPassword.value,
      }),
    })

    const result = await response.json()

    if (!response.ok) throw new Error(result.error || 'Login failed')

    localStorage.setItem('token', result.token)
    localStorage.setItem('user', JSON.stringify(result.data))

    console.log('✅ Logged in:', result)
    success.value = true
    userName.value = null
    userPassword.value = null
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="validLogin">
      <input v-model="userName" type="text" placeholder="Username" required /> <br />
      <input v-model="userPassword" type="password" placeholder="Password" required /> <br />
      <button>Login</button>
    </form>
    <p v-if="success">✅ Successfull Login!</p>
    <p v-if="error">❌ {{ error }}</p>
  </div>
</template>
