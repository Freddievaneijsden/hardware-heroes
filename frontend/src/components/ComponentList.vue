<script setup>
import { ref, onMounted } from 'vue'

import imageCpu from '../assets/img/imgcpu.png';
import imageGpu from '../assets/img/imggpu.png';
import imageMotherboard from '../assets/img/imgmotherboard.png';
import imageCooling from '../assets/img/imgcooling.png';
import imageRam from '../assets/img/imgram.png';
import imagePSU from '../assets/img/imgpsu.png';
import imageChassi from '../assets/img/imgchassi.png';
import imageHarddrive from '../assets/img/imgharddrive.png';

const emit = defineEmits(['select'])

const componentList = ref([])
const loading = ref(false)
const error = ref(null)

const imageMap = {
  'imageCpu': imageCpu,
  'imageGpu': imageGpu,
  'imageMotherboard': imageMotherboard,
  'imageCooling': imageCooling,
  'imageRam': imageRam,
  'imagePSU': imagePSU,
  'imageChassi': imageChassi,
  'imageHarddrive': imageHarddrive,
}

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('http://localhost:3000/components')
    if (!response.ok) throw new Error('Could not fetch components: ' + response.status)
    const data = await response.json()
    componentList.value = data.data
    console.log('Components loaded:', componentList.value)
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
  <section>
    <h2>Alla komponenter</h2>

    <p v-if="loading">Laddar komponenter...</p>
    <p v-else-if="error" style="color:red">{{ error }}</p>

    <ul v-else>
      <li
        v-for="component in componentList"
        :key="component.componentId"
        @click="selectComponent(component)"
      >
        <img
          v-if="component.componentImg"
          :src="imageMap[component.componentImg]"
          :alt="component.componentName"
          width="30"
          height="30"
          @error="(e) => console.log('Image error:', e.target.src)"
          @load="(e) => console.log('Image loaded:', e.target.src)"
        />
        {{ component.componentName }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
li {
  display: flex;
  align-items: center;
  gap: 10px;

  margin: 0.3rem 0;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
}
li:hover {
  background: #f1f1f1;
}
img {
  border-radius: 4px;
}
</style>
