<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Home from './components/Home.vue'
import UsersGet from './components/UsersGet.vue';
import UsersCreate from './components/UsersCreate.vue';
import UsersUpdate from './components/UsersUpdate.vue';
import UsersDelete from './components/UsersDelete.vue';
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
  <UsersUpdate />
  <UsersDelete />
  </body>
</template>

<style scoped></style>
