<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'

const { user, logout } = useAuth()
const showMenu = ref(false)

const toggleMenu = () => (showMenu.value = !showMenu.value)

const handleClickOutside = (e) => {
  const menu = document.querySelector('.user-menu')
  if (menu && !menu.contains(e.target)) showMenu.value = false
}

onMounted(() => document.addEventListener('click', handleClickOutside))
</script>

<template>
  <div class="user-menu">
    <button @click="toggleMenu">{{ user?.userName || 'User' }}</button>
    <div v-if="showMenu" class="dropdown">
      <button>Profile</button>
      <button>Settings</button>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<style scoped>
.user-menu {
  position: relative;
}

.dropdown {
  position: absolute;
  top: 110%;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #fef3c7;
  border: 2px solid #ec4899;
  border-radius: 8px;
  padding: 0;
  min-width: 80px;
}

.dropdown button {
  width: 100%;
  border: none;
  background: none;
  color: #000000;
  padding: 12px 14px;
  border-radius: 0;
  text-align: left;
  transition: background-color 0.4s ease;
  cursor: pointer;
}

.dropdown button:hover {
  background-color: #ec4899;
}
</style>
