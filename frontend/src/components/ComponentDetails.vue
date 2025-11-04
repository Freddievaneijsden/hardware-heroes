<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useChapterNavigation } from '@/composables/useChapterNavigation'

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

const articles = computed(() => props.component.articles || [])

const {
  currentChapterIndex,
  isChapterUnlocked,
  isCurrentChapterUnlocked,
  canGoToNextChapter,
  canGoToPreviousChapter,
  currentChapter,
  nextChapter,
  previousChapter,
  quizLevel
} = useChapterNavigation(articles)

const nextChapterTooltip = computed(() => {
  const nextIndex = currentChapterIndex.value + 1
  
  if (nextIndex >= articles.value.length) {
    return "No more chapters!"
  }
  
  if (!isChapterUnlocked.value(nextIndex)) {
    const requiredLevel = nextIndex
    const currentLevel = quizLevel.value || 0
    return `Finish quiz ${requiredLevel} to unlock next chapter!`
  }
  
  return ""
})

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
          <h3>
            Chapter {{ currentChapterIndex + 1 }} of {{ component.articles.length }}
          </h3>
          
          <div v-if="isCurrentChapterUnlocked">
            <p class="article-text" v-html="component.articles[currentChapterIndex].articleBody"></p>
          </div>
        </div>
      </div>
       
       <button
              @click="previousChapter" 
              :disabled="!canGoToPreviousChapter"
            >
              Previous Chapter
            </button>
            
            <button
              @click="nextChapter" 
              :disabled="!canGoToNextChapter"
              :title="!canGoToNextChapter ? nextChapterTooltip : ''"
            >
              Next Chapter
            </button>

            <button @click="emit('close')">Close</button>

            <div v-if="currentChapterIndex < articles.length - 1">
              <div v-if="!isChapterUnlocked(currentChapterIndex + 1)" class="unlock-message">
                <p>
                  To unlock the next chapter, you need to complete Quiz {{ currentChapterIndex + 1 }}.
                </p>
                <button @click="$router.push({ name: 'HardwareQuiz' })">
                  Take Quiz {{ currentChapterIndex + 1 }}
                </button>
              </div>
              <div v-else>
                <p>
                  Next chapter is unlocked! You can proceed to Chapter {{ currentChapterIndex + 2 }}.
                </p>
              </div>
            </div>
            <div v-else>
              <p class="unlock-text final-chapter">
                Congratulations! You've completed all chapters!
              </p>
            </div>
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

.navButton {

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

.article-content {
  text-align: center;
}

.article-image {
  float: none;
}

button{
  font-size: 13px;
  width: 160px;
  margin:5px 5px 20px 0;
}
  
}
</style>
