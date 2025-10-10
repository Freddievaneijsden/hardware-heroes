<script setup>
import { ref } from 'vue'

const user = ref(null)
const userName = ref(null)
const success = ref(false)
const error = ref(false)

const validUsername = async () => {
  success.value = false
  error.value = false

  try {
    const response = await fetch(
      `http://localhost:3000/login/user?userName=${encodeURIComponent(userName.value)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const result = await response.json()
    user.value = result.data

    if (!response.ok) {
      throw new Error('Could not find user with that username: ' + response.status)
    }

    success.value = true
    userName.value = null
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="validUsername">
      <input v-model="userName" type="text" placeholder="Username" required /> <br />
      <input type="password" placeholder="Password" required /> <br />
      <button>Login</button>
    </form>
    <p>{{ user }}</p>
    <p v-if="success">✅ User found successfully!</p>
    <p v-if="error">❌ {{ error }}</p>
  </div>
</template>
