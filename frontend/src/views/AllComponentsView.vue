
<script setup>
import { onMounted, ref } from 'vue'

const selectedUser = ref(null);
const userList = ref(null);
const loading = ref(false);
const error = ref(null);
const result = ref(null); 

const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await fetch('http://localhost:3000/users')

        if (!response.ok) {
            throw new Error('Could not fetch users: ' + response.status)
        }

        result.value = await response.json(); 
        userList.value = result.value.data;
    } catch (err) {
        error.value = err.message;

    } finally {
        loading.value = false;
    }
}

const showUser = (user) => {
    selectedUser.value = user;
}

onMounted(fetchData)
</script>

<template>
  <div class="users">
    <h1>Users</h1>
    <p>Den här sidan visar alla users</p>


    <ul>
      <li v-for="user in userList" :key="user.userId" @click="showUser(user)">
        {{ user.userName }} 
      </li>
    </ul>
    
    <div v-if="selectedUser">
      <h2>Selected User</h2>
      <p>ID: {{ selectedUser.userId }}</p>
      <p>Name: {{ selectedUser.userName }}</p>
      <p>Password: {{ selectedUser.userPassword }}</p>
      <p>Role: {{ selectedUser.userRole }}</p>
      <button @click="selectedUser = null">stäng</button>

    </div>
  </div>
</template>



