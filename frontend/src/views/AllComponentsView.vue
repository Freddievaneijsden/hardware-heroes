<script setup>
import { ref } from 'vue'
import ComponentList from '@/components/ComponentList.vue'
import ComponentDetails from '@/components/ComponentDetails.vue'

const selectedComponent = ref(null)
</script>

<template>
  <main>
    <h1>All components</h1>
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
main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #FCD34D;
}

.grid {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 600px) and (min-width: 375px) {
  .grid {
    grid-template-columns: 1fr;
  }
  main{
    margin: 0 auto;
    padding: 0.1rem;
  }
}

</style>
