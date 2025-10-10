<script setup>
import { ref } from 'vue';

const userId = ref('');
const error = ref(false);
const deleting = ref(false);

const deleteUser = async () => {
   error.value = null;
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

        if (!response.ok) {
            throw new Error('Could not delete user: ' + response.status);
        }
       
        userId.value = ''; // Rensa input

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
        <form @submit.prevent="deleteUser">
            <input v-model="userId" type="number"placeholder="User ID" />
            <button>
            Delete
            </button>
        </form>
    </div>
</template>