
<script setup>
import { onMounted, ref } from 'vue'

const selectedComponent = ref(null);
const componentList = ref(null);
const loading = ref(false);
const error = ref(null);
const result = ref(null); 

const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await fetch('http://localhost:3000/components')

        if (!response.ok) {
            throw new Error('Could not fetch components: ' + response.status)
        }

        result.value = await response.json(); 
        componentList.value = result.value.data;
    } catch (err) {
        error.value = err.message;

    } finally {
        loading.value = false;
    }
}

const showComponent = (component) => {
    selectedComponent.value = component;
}

onMounted(fetchData)
</script>

<template>
  <div class="components">
    <h1>Components</h1>
    <p>Den här sidan visar alla components</p>


    <ul>
      <li v-for="component in componentList" :key="component.componentId" @click="showComponent(component)">
        {{ component.componentName }} 
      </li>
    </ul>

    <div v-if="selectedComponent">
      <h2>Selected Component</h2>
      <p>ID: {{ selectedComponent.componentId }}</p>
      <p>Name: {{ selectedComponent.componentName }}</p>
      <p>Description: {{ selectedComponent.componentArticle }}</p>
      <button @click="selectedComponent = null">stäng</button>

    </div>
  </div>
</template>



