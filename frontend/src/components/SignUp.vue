<script setup>
import {ref} from 'vue'

const userName = ref(null);
const userPassword = ref(null);
const userRole = ref("1");
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
    <div class="form-container">
    <form class="form" @submit.prevent="handleSubmit">
        <p v-if="error" style="color: red">{{error}}</p>
        <h1>Sign up</h1>
        <input class="input" v-model="userName" type="text" placeholder="Name" /> 
        <input class="input" v-model="userPassword" type="password" placeholder="Password" /> 
        <select class="selectrole" v-model="userRole">
            <option class="option" value="1">Student</option>
            <option class="option" value="2">Teacher</option>
        </select>   
        <button class="custom-button">Register</button>
        </form>
        <p v-if="success" style="color: green">Thank you for signing up</p>
    </div>
</template>


<style scoped>
    .selectrole {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 400px;
  min-width: 317px;
  min-height: 44px;
  font-size: 16px;
  font-weight: bold;
  color: #ec4899;
  align-self: center;
}

.option {
  padding: 0.5rem;
  font-size: 14px;
    font-weight: bold;
    color: #ec4899;
}
</style>
