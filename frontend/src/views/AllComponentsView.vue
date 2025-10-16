<script setup>
import { ref } from 'vue'
import ComponentList from '@/components/ComponentList.vue'
import ComponentDetails from '@/components/ComponentDetails.vue'

const selectedComponent = ref(null)
</script>

<template>
  <main>
    <div class="title-wrapper">
      <h1>Components</h1>
    </div>
    <div class="grid">
      <ComponentList @select="selectedComponent = $event" />
      <ComponentDetails
        v-if="selectedComponent"
        :component="selectedComponent"
        @close="selectedComponent = null"
      />
    </div>
  </main>
</template>

<style scoped>
.title-wrapper {
  padding-top: 60px;
}

main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fcd34d;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
</style>
