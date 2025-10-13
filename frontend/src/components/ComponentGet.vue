<script setup>
import { onMounted, ref } from 'vue'

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

onMounted(fetchData)
</script>

<template>
    <div>
        <h1>Get components</h1>
        <p v-if="loading" style="color: green">Loading data...</p>
        <p v-else-if="error" style="color: red">{{error}}</p>
            <ul v-else>
                <li v-for="component in componentList" :key="component.componentId">
                    <p>{{ component.componentName }}</p>
                </li>
            </ul>
    </div>
</template>
