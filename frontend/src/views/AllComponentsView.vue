<script setup>
import { ref } from 'vue'
import ComponentList from '@/components/ComponentList.vue'
import ComponentDetails from '@/components/ComponentDetails.vue'

const selectedComponent = ref(null)
</script>

<template>
  <main>
    <div class="grid">
      <ComponentList @select="selectedComponent = $event" class="component-list" />

      <div class="component-details">
        <ComponentDetails
          v-if="selectedComponent"
          :component="selectedComponent"
          @close="selectedComponent = null"
        />
        <div v-else class="welcome-content">
          <h2>Hello future hardware hero!</h2>
          <h2>Select a component from the list to learn more</h2>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.title-wrapper {
  padding-top: 60px;
}

.welcome-content {
  padding: 5rem 1rem;
  text-align: center;
  font-size: 1.3rem;
}

.component-list {
  background-color: #fef3c7;
  padding-top: 100px;
  padding-left: 25px;
}

.component-details {
  padding-top: 100px;
}

main {
  background-color: #fcd34d;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}
</style>
