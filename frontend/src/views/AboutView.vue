<script setup>
import Nav from '../components/Nav.vue'
import About from '../components/About.vue'
</script>

<template>
  <header>
    <Nav />
  </header>
  <div class="boy-band">
    <About />
  </div>
</template>

<style scope>
.boy-band {
  display: flex;
  justefy-content: center;
  align-items: center;
}
</style>
