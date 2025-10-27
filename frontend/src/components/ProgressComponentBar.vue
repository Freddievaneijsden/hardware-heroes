<script setup>
import {computed} from 'vue';

const props = defineProps({
  currentLevel: {
    type: Number,
    required: true
  }
});

const progressPercentage = computed(() => (props.currentLevel / 5) * 100, 100);
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
  background-color: #F97316;
  transition: width 0.3s ease;
}

.progress-text {
  grid-area: 1/1;
  position: relative;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex;
  padding-left: 35%;
  color: black;
  font-weight: bold;
  font-size: 20px;
  pointer-events: none; 
}
</style>