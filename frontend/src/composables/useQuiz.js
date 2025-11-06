import { ref, computed } from 'vue'
import { useProgress } from '@/composables/useProgress'

const { getCurrentChapter, updateProgressChapter } = useProgress()
const loading = ref(false)
const error = ref(null)
const quizQuestionList = ref([])
const userAnswers = ref([])
const selectedChapterId = ref(null)
const completedChapters = ref([])
const allCorrect = ref(false)

const allAnswered = computed(
  () => userAnswers.value.length === quizQuestionList.value.length
)

const fetchData = async () => {
  if (selectedChapterId.value === null) return
  loading.value = true
  error.value = null

  try {
    const chapterToFetch = selectedChapterId.value + 1

    const response = await fetch(`http://localhost:3000/quizzes/${chapterToFetch}`)
    if (!response.ok) throw new Error('Could not fetch quizzes: ' + response.status)
    const data = await response.json()

    quizQuestionList.value = data.data.map(q => {
      const answers =[
        q.quizRightAnswer,
        q.quizWrongAnswer1,
        q.quizWrongAnswer2
      ]
      const shuffleAnswers = answers.sort(() => Math.random()-0.5)

      return{
      quizId: q.quizId,
      quizQuestion: q.quizQuestion,
      quizRightAnswer: q.quizRightAnswer,
      answers:shuffleAnswers,
      status: null, //'correct' | 'incorrect' | null
      }
    })
    
    userAnswers.value = []
    console.log('Quizzes loaded:', quizQuestionList.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const loadChapter = async () => {
  try {
    const chapter = await getCurrentChapter()
    if (chapter !== null) {
      selectedChapterId.value = chapter
      console.log('User current chapter:', chapter)
      await fetchData()
      completedChapters.value = Array.from({ length: chapter }, (_, i) => i)
    } else {
      console.warn('No chapter found for user progress.')
    }
  } catch (err) {
    console.error('Failed to load user progress:', err)
  }
}

const handleSubmit = async () => {
  if (!allAnswered.value) {
    alert('Please answer all questions before submitting!')
    return
  }

  quizQuestionList.value.forEach((q) => {
    const ans = userAnswers.value.find((a) => a.id === q.quizId)
    const isCorrect = ans?.selectedAnswer === q.quizRightAnswer
    q.status = isCorrect ? 'correct' : 'incorrect'
  })

  allCorrect.value = quizQuestionList.value.every((q) => q.status === 'correct')

  if (allCorrect.value) {
    console.log('🎉 All questions correct! Advancing to next chapter...')
    await updateProgressChapter(selectedChapterId.value)

    if (!completedChapters.value.includes(selectedChapterId.value)) {
      completedChapters.value.push(selectedChapterId.value)
    }

    const newChapter = await getCurrentChapter()
    if (newChapter !== selectedChapterId.value) {
      selectedChapterId.value = newChapter
      await fetchData()
      userAnswers.value = []
    }
  }

  return allCorrect.value
}


const resetQuiz = async() => {
  if(selectedChapterId.value === null){
    console.warn('no quiz to reset')
    return
  }
  userAnswers.value = []
  allCorrect.value= false

  await fetchData()
}

export function useQuiz() {
  loadChapter();
  return {
    quizQuestionList,
    userAnswers,
    selectedChapterId,
    completedChapters,
    allCorrect,
    allAnswered,
    handleSubmit,
    resetQuiz,
    fetchData,
  }
}