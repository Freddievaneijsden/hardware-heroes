<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import UserMenu from './UserMenu.vue'

const { token, user, logout } = useAuth()
const output = ref('Test')
</script>

<template>
  <header>
    <div class="header-left">
      <h1>Hardware Heroes</h1>
    </div>
    <div class="header-right">
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
    </div>
  </header>
</template>

<style>
h1 {
  text-align: center;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #14b8a6;
  padding: 0px;
  gap: 700px;
  width: 100%;
  left: 0;
}

.nav {
  display: flex;
  gap: 15px;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-left {
  padding: 0 20px;
}

.header-right {
  padding-right: 20px;
}

button {
  font-weight: bold;
  font-size: 16px;
  padding: 0.8rem 0.2rem;
  border-radius: 8px;
  background-color: #ec4899;
  min-width: 100px;
  cursor: pointer;
}

@media (max-width: 600px) and (min-width: 375px) {
  header {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    text-align: center;
    height: auto;
    padding: 0px;
    min-height: 70px; 
    width: 100%;
    
  }
  h1{
    margin-bottom: 0px;
  }

  .nav {
    justify-content: center;
    flex-wrap: wrap;
    
  }

  button{
    margin-bottom: 20px;
    
  }
}

</style>
