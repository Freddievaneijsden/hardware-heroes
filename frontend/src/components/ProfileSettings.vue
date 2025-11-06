<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userName = ref(null)
const userPassword = ref('')
const repeatPassword = ref('')
const userId = ref(null)
const success = ref(false)
const error = ref(false)
const router = useRouter()
const showUserNameForm = ref(false)
const showPasswordForm = ref(false)

const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password)
  const isLongEnough = password.length >= 8
  const noSpaces = !/\s/.test(password)
  return hasUpperCase && isLongEnough && noSpaces
}

const repeatedPassword = (repeatPassword) => {
  return userPassword.value === repeatPassword
}

const handleSubmit = async () => {
  success.value = false
  error.value = ''

  const storedUser = localStorage.getItem('user')
  if (!storedUser) {
          error.value = 'No user found in localStorage'
          return 
        }
      
    let parsedUser
    try {
      parsedUser = JSON.parse(storedUser) 
    } catch(e) {
        error.value = 'Failed to parse data'
        return
      }

    if (!parsedUser.userId) {
    error.value = 'User ID missing in stored user object'
    return
  }

  userId.value = parsedUser.userId

  if (userPassword.value || repeatPassword.value) {
  if (!repeatedPassword(repeatPassword.value)) {
    error.value = 'Passwords do not match'
    return
  }

  if (!validatePassword(userPassword.value)) {
    error.value = 'Password must contain one upper case, 8 charachters and no spaces'
    return
  }
  }
   const updateData = {
    rolesId: parsedUser.rolesId
  }

  if (userName.value) {
    updateData.userName = userName.value
    parsedUser.userName = userName.value
  }

  if (userPassword.value) {
    updateData.userPassword = userPassword.value
    parsedUser.userPassword = userPassword.value
  }

  if (!updateData.userName && !updateData.userPassword) {
    error.value = 'Please fill in at least one field to update'
    return
  }

  localStorage.setItem('user', JSON.stringify(parsedUser))

  try {
    const response = await fetch(`http://localhost:3000/users/${userId.value}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
      })
    
    if (!response.ok) throw new Error('Failed to update user: ' + response.status)

  success.value = true
  window.location.reload();
  
  }catch (err) {
    error.value = err.message
    return
  }
}

const handleDelete = async () => {
const confirmed = confirm("Are you sure you want to delete your account?");
if(!confirmed) {
  return;
}

  error.value = ''
  success.value = false

  const storedUser = localStorage.getItem('user')
  if (!storedUser) {
    error.value = 'Could not find user'
    return
  }

  let parsedUser 
  try {
    parsedUser = JSON.parse(storedUser)
  }catch (e) {
    error.value = 'failed to parse user data'
    return
  }

  if (!parsedUser.userId) {
      error.value = 'User id is missing'
      return
  }

  try {
      const response = await fetch(`http://localhost:3000/users/${parsedUser.userId}`, {
        method: 'DELETE',
  })

  if (!response.ok) throw new Error('Failed to delete user: ' + response.status)

  localStorage.removeItem('user')
  localStorage.removeItem('token')
  success.value = true
  alert('Youre account has been deleted')
  window.location.href = '/login'
} catch(err) {
  error.value = err.message
}
}

</script>
<template>
  <div class="settings-view">
    <div class="settings-stack">
      <div class="settings-container">
    <form class="form" @submit.prevent="handleSubmit">
      <h1>Update account</h1>
      <button class="custom-button" @click="showUserNameForm = !showUserNameForm">Change username</button>
      <form v-if="showUserNameForm" class="form" @submit.prevent="handleSubmit">
          <input class="input" v-model="userName" type="text" placeholder="New Username" />
          <button class="custom-button">Update</button>
        </form>
      <button class="custom-button" @click="showPasswordForm = !showPasswordForm">
          Change Password
        </button>
        <form v-if="showPasswordForm" class="form" @submit.prevent="handleSubmit">
          <div class="password-fields">
          <input class="input" v-model="userPassword" type="password" placeholder="New Password" />
          <input class="input" v-model="repeatPassword" type="password" placeholder="Repeat Password" />
          <button class="custom-button">Update</button>
          </div>
        </form>
        <button class="custom-button" @click.prevent="handleDelete">Delete Account</button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="success" style="color: green">Account for {{ userName }} updated successfully!</p>
  </div>
  </div>
  </div>
</template>
<style scoped>

.settings-view{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 83vh;
  background-color: #FCD34D;
  margin-top: 120px;
}

.settings-container {
  width: 600px;
  padding: 1rem;
  background-color: #14B8A6;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(70, 58, 58, 0.1);
  text-align: center;
}

.settings-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding-right: 250px;
  margin-top: 20px;
}

.password-fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-button-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-button-row .input {
  flex: 1; 
}

.input-button-row .custom-button {
  white-space: nowrap;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .settings-view {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    min-height: 80vh;
    margin-top: 0;
  }

  .settings-stack {
    padding: 0;
    width: 75%;
    flex-direction: column;
    align-items: center;
  }

  .settings-container {
    width: 100%;
    max-width: 360px;
    margin-top: 0px;
    min-height: 0vh;
    max-height: 72vh;
    padding: 0px 0px;
  }

  .custom-button {
    min-height: 30px;
    text-align: center;
    align-content: center;
    padding: 0px 0px;
  }

  .input {
    min-height: 30px;
    max-height: 30px;
    text-align: center;
  }
}
</style>
