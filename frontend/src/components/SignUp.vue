<script setup>
import {ref} from 'vue'

const userName = ref(null);
const userPassword = ref(null);
const userRole = ref(null);
const success = ref(false);
const error = ref(false);

const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const isLongEnough = password.length >= 8;
  const noSpaces = !/\s/.test(password);
  return hasUpperCase && isLongEnough && noSpaces;
}

const handleSubmit = async() => {
    success.value = false; 
    error.value = ('')

    if (!userName.value || !userPassword.value || !userRole.value) {
        error.value = 'All fields must not be blank';
        return;
    }

    if (!validatePassword(userPassword.value)) {
        error.value = 'Password must contain one upper case, 8 charachters and no spaces';
        return;
    }

    try{
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: userName.value,
                userPassword: userPassword.value,
                rolesId: userRole.value
            })
        });
        if(!response.ok){
            throw new Error("Could not register: " + response.status);
        }
       success.value = true;
    }catch(err){
            error.value = err.message;
        }
}
</script>

<template>
    <div>
        <h1>Sign up</h1>
        <p v-if="error" style="color: red">{{error}}</p>

        <form @submit.prevent="handleSubmit">
        <input v-model="userName" type="text" placeholder="Name" /> 
        <input v-model="userPassword" type="password" placeholder="Password" /> 
        <input v-model="userRole" type="text" placeholder="Roles id" /> 
        <button>Register</button>
        </form>

        <p v-if="success" style="color: green">Thank you for signing up</p>
    </div>
</template>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
form {
  display: flex;
  flex-direction: column;
}
input {
  margin-bottom: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
}

</style>
