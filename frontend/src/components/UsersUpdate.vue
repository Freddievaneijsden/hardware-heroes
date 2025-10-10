<script setup>
import {ref} from 'vue';

const userId = ref(null);
const userName = ref(null);
const userPassword = ref(null);
const userRole = ref(null);
const success = ref(false);
const error = ref(false);

const updateUser = async() => {
    success.value = false;
    error.value = null;
    try{
        const response =await fetch(`http://localhost:3000/users/${userId.value}`,{

            method: "PUT",
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
            throw new Error("Could not update user: " + response.status);
        }
        success.value = true;
    }catch(err) {
        error.value = err.message;
    }
}

</script>

<template>
    <div>
        <h1>Update User</h1>

        <p v-if="error" style="color: red">{{ error }}</p>
        <p v-if="success" style="color: green">User has been updated</p>
        
        <form @submit.prevent="updateUser" v-else>
        <input v-model="userId" type="number" placeholder="Id" />
        <input v-model="userName" type="text" placeholder="Username" />
        <input v-model="userPassword" type="text" placeholder="Password" />
        <input v-model="userRole" type="text" placeholder="Role" />
        <button>Update</button>
        </form>
    </div>
</template>