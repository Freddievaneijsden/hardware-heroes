<script setup>
import imageCpu from '../assets/img/imgcpu.png';
import imageGpu from '../assets/img/imggpu.png';
import imageMotherboard from '../assets/img/imgmotherboard.png';
import imageCooling from '../assets/img/imgcooling.png';
import imageRam from '../assets/img/imgram.png';
import imagePSU from '../assets/img/imgpsu.png';
import imageChassi from '../assets/img/imgchassi.png';
import imageHarddrive from '../assets/img/imgharddrive.png';

const props = defineProps({
  component: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close'])

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
</script>

<template>
  <section class="details">
    <h2>{{ component.componentName }}</h2>

    <img
      v-if="component.componentImg"
      :src="imageMap[component.componentImg]"
      :alt="component.componentName"
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
img {
  object-fit: cover;
}

</style>
