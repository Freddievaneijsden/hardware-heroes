import { ref, computed } from 'vue'

const quizQuestionList = ref([])
const userAnswers = ref([])
const allCorrect = ref(false)
const allAnswered = computed(
  () => userAnswers.value.length === quizQuestionList.value.length
)

const handleSubmit = () => {
  if (!allAnswered.value) {
    alert('Please answer all questions before submitting!')
    return false
  }

  quizQuestionList.value.forEach((q) => {
    const ans = userAnswers.value.find((a) => a.id === q.quizId)
    const isCorrect = ans?.selectedAnswer === q.quizRightAnswer
    q.status = isCorrect ? 'correct' : 'incorrect'
  })

  allCorrect.value = quizQuestionList.value.every((q) => q.status === 'correct')

  return allCorrect.value
}

export function useQuiz() {
  return {
    quizQuestionList,
    userAnswers,
    allAnswered,
    allCorrect,
    handleSubmit,
  }
}