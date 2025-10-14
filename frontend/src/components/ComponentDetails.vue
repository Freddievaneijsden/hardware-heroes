<script setup>
const props = defineProps({
  component: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="details">
    <h2>Vald komponent</h2>
    <p><strong>ID:</strong> {{ component.componentId }}</p>
    <p><strong>Namn:</strong> {{ component.componentName }}</p>
    <p><strong>Beskrivning:</strong> {{ component.componentArticle }}</p>
    <button @click="emit('close')">Stäng</button>
  </div>
</template>

<style scoped>
.details
button {
  margin-top: 1rem;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

</style>
