<script setup>
import { ref } from 'vue';

const userId = ref('');
const error = ref(null);
const deleting = ref(false);
const success = ref(false);

const deleteUser = async () => {
   error.value = null;
   success.value = false;

    if (!userId.value) {
        error.value = "Please enter a user ID";
        return;
    }

    deleting.value = true;

   try {
        const response = await fetch(`http://localhost:3000/users/${userId.value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 404) {
            throw new Error(`User with ID ${userId.value} not found`);
        }

        if (!response.ok) {
            throw new Error(`Could not delete user ${response.status}`);
        }
       
        success.value = true;
        userId.value = '';

    } catch (err) {
        error.value = err.message;
    } finally {
        deleting.value = false;
    }
};
</script>

<template>
    <div>
        <h1>Delete User</h1>
        
        <p v-if="error" style="color: red">{{ error }}</p>
        <p v-if="success" style="color: green">User {{userId.value}} successfully deleted!</p>
        <form @submit.prevent="deleteUser">
            <input v-model="userId" type="number"placeholder="User ID" />
            <button>
            Delete
            </button>
        </form>
    </div>
</template>