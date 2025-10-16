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

      <ComponentDetails
        class="component-details"
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
