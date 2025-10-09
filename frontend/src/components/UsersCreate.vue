<script setup>
import { ref } from 'vue';

const userName = ref(null);
const userPassword = ref(null);
const userRole = ref(null);
const success = ref(false);
const error = ref(false);

const createUser = async() => {
    success.value = false; 
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
            throw new Error("Could not create user: " + response.status);
        }
       success.value = true;
    }catch(err){
            error.value = err.message;
        }
}

</script>


<template>
    <div>
    <h1>Create User </h1>
        <p v-if="error" style="color: red">{{error}}</p>
        <form @submit.prevent="createUser" v-else>
        <input v-model="userName" type="text" placeholder="Name" /> 
        <input v-model="userPassword" type="text" placeholder="Password" /> 
        <input v-model="userRole" type="text" placeholder="Roles id" /> 
        <button>Add</button>
        </form>
        <p v-if="success" style="color: green">You have added a new user!</p>
    </div>

</template>