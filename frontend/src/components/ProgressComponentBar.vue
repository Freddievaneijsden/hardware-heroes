<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentLevel: {
    type: Number,
    required: true,
  },
})

const progressPercentage = computed(() => (props.currentLevel / 5) * 100, 100)
</script>

<template>
  <div class="progress-container">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
      <span class="progress-text">{{ Math.round(progressPercentage) }}% Knowledge</span>
    </div>
  </div>
</template>

<style scoped>
.progress-container {
  text-align: center;
}
.progress-bar {
  display: grid;
  width: 150%;
  height: 35px;
  border-radius: 30px;
  overflow: hidden;
  border: 6px solid hsla(160, 100%, 37%, 1);
}
.progress-fill {
  grid-area: 1/1;
  height: 100%;
  background-color: #f97316;
  transition: width 0.3s ease;
}

.progress-text {
  grid-area: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-family: 'Baloo 2';
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #374151;
  text-shadow:
    0 0 3px rgba(252, 211, 77, 0.6),
    0 0 8px rgba(252, 211, 77, 0.4);
}
</style>
