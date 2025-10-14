<script setup>
import UsersGet from '../components/UsersGet.vue';
import UsersCreate from '../components/UsersCreate.vue';
import UsersUpdate from '../components/UsersUpdate.vue';
import UsersDelete from '../components/UsersDelete.vue';
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
  <UsersCreate />
  <UsersGet />
  <UsersUpdate />
  <UsersDelete />  
  </main>
</template>

<style scoped>
main{
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  background-color: #FCD34D;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 2rem;
}
</style>
