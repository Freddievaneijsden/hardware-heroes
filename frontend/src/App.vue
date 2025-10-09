<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Home from './components/Home.vue'
import UsersGet from './components/UsersGet.vue';
import UsersCreate from './components/UsersCreate.vue';

</script>

<template>
  <Home />
  <UsersCreate />
  <UsersGet />
</template>

<style scoped></style>
