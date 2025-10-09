<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Home from './components/Home.vue'
import UsersGet from './components/UsersGet.vue';
import UsersCreate from './components/UsersCreate.vue';
import Nav from './components/Nav.vue';

</script>

<template>
  <header>
  <Nav />
  </header>
  <body>
  <Home />
  <UsersCreate />
  <UsersGet />
  </body>
</template>

<style scoped></style>
