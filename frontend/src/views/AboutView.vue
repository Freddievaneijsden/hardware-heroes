<script setup>
import Nav from '../components/Nav.vue'
import About from '../components/About.vue'
</script>

<template>
  <header>
    <Nav />
  </header>
  <div class="about">
    <About />
  </div>
</template>

<style scope>
.about {
  display: flex;
  justify-content: center;
}
</style>
