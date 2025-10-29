<script setup>
import Nav from '../components/Nav.vue'
import Statistics from '../components/Statistics.vue'
</script>
<template>
  <header>
    <Nav />
  </header>
  <main>
    <div class="sideBar">
      <Statistics />
    </div>
  </main>
</template>

<style scope>
.sideBar {
  background-color: #fef3c7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 400px;
  padding: 20px 20px;
}
</style>
