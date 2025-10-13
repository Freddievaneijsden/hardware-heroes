<script setup>
import UsersGet from '../components/UsersGet.vue';
import UsersCreate from '../components/UsersCreate.vue';
import UsersUpdate from '../components/UsersUpdate.vue';
import UsersDelete from '../components/UsersDelete.vue';
import ComponentGet from '@/components/ComponentGet.vue';
import Nav from '../components/Nav.vue';
import imageHome from '../assets/completeComputer-removebg-preview.png'

</script>

<template>
<header>
  <Nav />
  </header>
  <main>
    <img :src="imageHome" alt="Home Image" />
  <RouterLink to="/hardwareKnowledge">Gå till HardwareKnowledge</RouterLink>
  <ComponentGet />
  <UsersCreate />
  <UsersGet />
  <UsersUpdate />
  <UsersDelete />  
  </main>
</template>
