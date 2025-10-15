<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import UserMenu from './UserMenu.vue'

const { token, user, logout } = useAuth()
const output = ref('Test')
</script>

<template>
  <header>
    <h1>Hardware Heroes</h1>
    <nav class="nav">
      <RouterLink to="/">
        <button>Home</button>
      </RouterLink>

      <RouterLink v-if="!token" to="/login">
        <button>Login</button>
      </RouterLink>
      <div v-else class="user-actions">
        <UserMenu />
      </div>
    </nav>
  </header>
</template>

<style>
body{
  width: 100%;
}

h1 {
  color: #000000;
  text-align: center;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #14b8a6;
  padding: 10px 20px;
  gap: 700px;
  width: 100%;
  left: 0;
}

.nav {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

button {
  font-weight: bold;
  font-size: 16px;
  padding: 0.8rem 0.2rem;
  border-radius: 8px;
  background-color: #ec4899;
  min-width: 100px;
}
</style>
