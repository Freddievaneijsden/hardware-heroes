<script setup>
import { onMounted, ref } from 'vue'

const emit = defineEmits(['select'])

const componentList = ref([])
const loading = ref(false)
const error = ref(null)

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('http://localhost:3000/components')
    if (!response.ok) throw new Error('Could not fetch components: ' + response.status)
    const data = await response.json()
    componentList.value = data.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const selectComponent = (component) => {
  emit('select', component)
}

onMounted(fetchData)
</script>

<template>
  <div>
    <h2>Alla komponenter</h2>

    <p v-if="loading">Laddar...</p>
    <p v-else-if="error" style="color:red">{{ error }}</p>
    <p v-else-if="!componentList.length">Inga komponenter hittades.</p>

    <ul v-else>
      <li 
        v-for="component in componentList" 
        :key="component.componentId"
        @click="selectComponent(component)"
      >
        {{ component.componentName }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

li {
  margin: 0.3rem 0;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
}
li:hover {
  background: #f1f1f1;
}
</style>
