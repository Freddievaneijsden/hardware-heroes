import { ref, computed, onMounted } from 'vue'
import { useQuizProgress } from './useQuizProgress'

export function useChapterNavigation(articles) {
  const currentChapterIndex = ref(0)
  const { quizLevel, fetchQuizLevel } = useQuizProgress()

  onMounted(async () => {
    await fetchQuizLevel()
  })


  const isChapterUnlocked = computed(() => {
    return (chapterIndex) => {
      if (chapterIndex === 0) return true
      
      return quizLevel.value >= chapterIndex
    }
  })

  const canGoToNextChapter = computed(() => {
    const nextIndex = currentChapterIndex.value + 1
    return nextIndex < articles.value.length && isChapterUnlocked.value(nextIndex)
  })

  const isCurrentChapterUnlocked = computed(() => {
    return isChapterUnlocked.value(currentChapterIndex.value)
  })

  const nextChapter = () => {
    if (canGoToNextChapter.value) {
      currentChapterIndex.value++
    }
  }

  const previousChapter = () => {
    if (currentChapterIndex.value > 0) {
      currentChapterIndex.value--
    }
  }

  const canGoToPreviousChapter = computed(() => {
    return currentChapterIndex.value > 0
  })

  const currentChapter = computed(() => {
    if (articles.value && articles.value.length > 0) {
      return articles.value[currentChapterIndex.value]
    }
    return null
  })

  return {
    currentChapterIndex,
    quizLevel,

    isChapterUnlocked,
    isCurrentChapterUnlocked,
    canGoToNextChapter,
    canGoToPreviousChapter,
    currentChapter,
    
    nextChapter,
    previousChapter,
    fetchQuizLevel
  }
}