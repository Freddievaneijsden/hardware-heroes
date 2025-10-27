import { ref, computed } from 'vue';
import { useProgress } from './useProgress';

export function useQuizProgress() {
  const quizLevel = ref(null);
  const progress =  useProgress();
  console.log('Progress object:', progress);
  
  

  const fetchQuizLevel = async () => {
    try {
      quizLevel.value = await progress.getCurrentChapter();
      console.log('Fetched quiz level:', quizLevel.value);
      
    } catch (err) {
      console.error('Failed to fetch quiz level:', err);
    }
  };


  const levelImage = computed(() => {
    const images = [
      new URL('@/assets/img/level1.png', import.meta.url).href,
      new URL('@/assets/img/level2.png', import.meta.url).href,
      new URL('@/assets/img/level3.png', import.meta.url).href,
      new URL('@/assets/img/level4.png', import.meta.url).href,
      new URL('@/assets/img/level5.png', import.meta.url).href
    ];
    return images[quizLevel.value - 1] || new URL('@/assets/img/imgcompleteComputer.png', import.meta.url).href;
  });

  return {
    quizLevel, 
    levelImage,
    fetchQuizLevel
  };
}

