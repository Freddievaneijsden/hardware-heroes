<script setup>
import { ref } from 'vue'
import SignUp from '@/components/SignUp.vue'
import { useRouter } from 'vue-router'

const userName = ref(null)
const userPassword = ref(null)
const success = ref(false)
const error = ref(false)
const token = ref(null)
const user = ref(null)
const router = useRouter()
const showSignUp = ref(false)

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

    token.value = result.token
    user.value = result.data

    localStorage.setItem('token', result.token)
    localStorage.setItem('user', JSON.stringify(result.data))

    console.log('✅ Logged in:', result)
    success.value = true
    userName.value = null
    userPassword.value = null

    router.push('/').then(() => {
      window.location.reload()
    })
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div class="login-view">
    <div class="form-stack">
      <div class="form-container">
        <form class="form" @submit.prevent="validLogin" v-if="!success">
          <h1>Login</h1>
          <input class="input" v-model="userName" type="text" placeholder="Username" required />
          <input
            class="input"
            v-model="userPassword"
            type="password"
            placeholder="Password"
            required
          />
          <button class="custom-button">Login</button>
          <button class="custom-button" @click="showSignUp = !showSignUp">Sign Up</button>
        </form>
        <p v-if="error">❌ {{ error }}</p>
      </div>
      <div>
        <SignUp v-if="showSignUp" />
      </div>
    </div>
  </div>
</template>
