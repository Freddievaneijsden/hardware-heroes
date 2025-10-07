<script setup>
import { ref } from 'vue'
import imageHome from '../assets/completeComputer-removebg-preview.png'

const output = ref('Test')
</script>

<template>
  <h1>Hello!</h1>
  <p>{{ output }}</p>
  <img :src="imageHome" alt="Computer" />
</template>
