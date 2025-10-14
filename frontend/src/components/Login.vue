<script setup>
import { ref, onMounted, watch } from 'vue'
import SignUp from '@/components/SignUp.vue'

const userName = ref(null)
const userPassword = ref(null)
const success = ref(false)
const error = ref(false)
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
  } catch (err) {
    error.value = err.message
  }
}

const logout = () => {
  token.value = null
  user.value = null
}
</script>


<template>
  <div>
    <form @submit.prevent="validLogin" v-if="!token">
      <input v-model="userName" type="text" placeholder="Username" required /> <br />
      <input v-model="userPassword" type="password" placeholder="Password" required /> <br />
      <button>Login</button>
    </form>

    <div v-else>
      <button>{{ user?.userName || 'User' }}</button>
      <button @click="logout">Logout</button>
    </div>

    <p v-if="success">✅ Successfull Login!</p>
    <p v-if="error">❌ {{ error }}</p>


  <div class="login-view">
    <div class="form-stack">
      <div class="form-container">
        <form class="form" @submit.prevent="validLogin">
          <h1>Login</h1>
          <input class="input" v-model="userName" type="text" placeholder="Username" required />
          <input class="input" v-model="userPassword" type="password" placeholder="Password" required />
          <button>Login</button>
          <button type="button" @click="showSignUp = !showSignUp">Sign Up</button>
        </form>
        <p v-if="success">✅ Successfull Login!</p>
        <p v-if="error">❌ {{ error }}</p>
      </div>
</div>
  <SignUp v-if="showSignUp"/>
    </div>
  </div>
</template>

    
