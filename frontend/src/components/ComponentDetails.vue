<script setup>
import { ref } from 'vue'

import imageCpu from '../assets/img/imgcpu.png'
import imageGpu from '../assets/img/imggpu.png'
import imageMotherboard from '../assets/img/imgmotherboard.png'
import imageCooling from '../assets/img/imgcooling.png'
import imageRam from '../assets/img/imgram.png'
import imagePSU from '../assets/img/imgpsu.png'
import imageChassi from '../assets/img/imgchassi.png'
import imageHarddrive from '../assets/img/imgharddrive.png'

const props = defineProps({
  component: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['close'])

const currentChapterIndex = ref(0)

const nextChapter = () => {
  if (currentChapterIndex.value < props.component.articles.length - 1) {
    currentChapterIndex.value++
  }
}

const previousChapter = () => {
  if (currentChapterIndex.value > 0) {
    currentChapterIndex.value--
  }
}

const imageMap = {
  imageCpu: imageCpu,
  imageGpu: imageGpu,
  imageMotherboard: imageMotherboard,
  imageCooling: imageCooling,
  imageRam: imageRam,
  imagePSU: imagePSU,
  imageChassi: imageChassi,
  imageHarddrive: imageHarddrive,
}
</script>

<template>
  <section class="details">
    <h2>{{ component.componentName }}</h2>
    <div class="article-content">
      <img
        v-if="component.componentImg"
        :src="imageMap[component.componentImg]"
        :alt="component.componentName"
        class="article-image"
      />
      
      <div v-if="component.articles && component.articles.length > 0">
        <div class="article-section">
          <h3>Chapter {{ currentChapterIndex + 1 }} of {{ component.articles.length }}</h3>
          <p class="article-text">{{ component.articles[currentChapterIndex].articleBody }}</p>
        </div>
        
       <button
              @click="previousChapter" 
              :disabled="currentChapterIndex === 0"
            >
              Previous Chapter
            </button>
            
            <button
              @click="nextChapter" 
              :disabled="currentChapterIndex >= component.articles.length - 1"
              >
              Next Chapter
            </button>

            <button @click="emit('close')">Close</button>
    </div>
  </section>
</template>

<style scoped>
.details {
  padding: 1rem;
}

h2 {
  font-size: 32px;
  text-align: center;
}

.article-text {
  white-space: pre-line;
}

.article-content {
  text-align: justify;
  line-height: 1.6;
  padding: 0 80px;
}

.article-image {
  float: left;
  margin: 0 10px 10px 0;
  max-width: 200px;
  height: auto;
  object-fit: cover;
}

button {
  width: 180px;
  margin:20px 10px 10px 0
}

@media (max-width: 600px) and (min-width: 375px) {
  .article-content {
    padding: 0 10px;
  }

  .details {
    padding: 0;
  }
  
}
</style>
