<script setup>
import Nav from '../components/Nav.vue'
import Statistics from '../components/Statistics.vue'
</script>
<template>
  <header>
    <Nav />
  </header>
  <main>
    <div>
      <Statistics />
    </div>
  </main>
</template>

<style scope>
main {
  background-color: #fcd34d;
  min-height: 100vh;
}
</style>
