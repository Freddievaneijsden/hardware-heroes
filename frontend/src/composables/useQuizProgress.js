import { ref, computed } from 'vue';

export function useQuizProgress() {
  const quizLevel = ref(5);

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
    levelImage
  };
}

