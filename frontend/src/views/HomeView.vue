<script setup>
import UsersGet from '../components/UsersGet.vue';
import UsersCreate from '../components/UsersCreate.vue';
import UsersUpdate from '../components/UsersUpdate.vue';
import UsersDelete from '../components/UsersDelete.vue';
import HardwareKnowledgeView from './HardwareKnowledgeView.vue';
import Nav from '../components/Nav.vue';

</script>

<template>
<header>
  <Nav />
  </header>
  <main>
  <RouterLink to="/hardwareKnowledge">Gå till HardwareKnowledge</RouterLink>
  <UsersCreate />
  <UsersGet />
  <UsersUpdate />
  <UsersDelete />  
  </main>
</template>
