<script setup>
import { RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
</script>

<template>
  <main>
    <Nav />
    <RouterView v-slot="{ Component }">
      <transition name="grow-in">
        <Component :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>

<style>
.grow-in-enter-from {
  opacity: 0;
  transform: scale(0.3);
}

.grow-in-enter-to {
  opacity: 1;
}

.grow-in-enter-active {
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;
}

.grow-in-leave-to {
  opacity: 0;
  transform: scale(0.3);
}

.grow-in-leave-active {
  transition:
    opacity 0.3s ease-in,
    transform 0.3s ease-in;
}
</style>
