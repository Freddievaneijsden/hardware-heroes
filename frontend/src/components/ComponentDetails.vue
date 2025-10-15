<script setup>
const props = defineProps({
  component: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close'])

const getImageUrl = (imageName) => {
  if (!imageName) return null
  return `/img/${imageName}`
}
</script>

<template>
  <section class="details">
    <h2>{{ component.componentName }}</h2>

    <img
      v-if="component.componentImg"
      :src="getImageUrl(component.componentImg)"
      :alt="component.componentName"
      width="150"
      height="150"
      @error="(e) => console.log('Selected image error:', e.target.src)"
      @load="(e) => console.log('Selected image loaded:', e.target.src)"
    />

    <p><strong>ID:</strong> {{ component.componentId }}</p>
    <p><strong>Beskrivning:</strong> {{ component.componentArticle }}</p>

    <button @click="emit('close')">Stäng</button>
  </section>
</template>

<style scoped>
.details {
  padding: 1rem;
  border-radius: 8px;
}
button {
  margin-top: 1rem;
  background: #facc15;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background: #eab308;
}
</style>
