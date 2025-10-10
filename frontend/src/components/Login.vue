<script setup>
import { ref } from 'vue'

const user = ref(null)
const success = ref(false)
const error = ref(false)

const validUsername = async () => {}
</script>

<template>
  <div>
    <form @submit.prevent="checkAccount">
      <input type="text" placeholder="Username" required /> <br />
      <input type="text" placeholder="Password" required /> <br />
      <button>Login</button>
      <p>{{ success }}</p>
    </form>
  </div>
</template>
