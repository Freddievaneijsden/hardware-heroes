<script setup>
import { computed, ref } from 'vue'
import QuizQuestionDetails from '@/components/QuizQuestionDetails.vue'
import QuizQuestionList from '@/components/QuizQuestionList.vue'

const selectedQuizQuestion = ref(null)
const quizListRef = ref(null)
const quizStatus = ref('start')

const handleAnswerSelected = (payload) => {
  if (!quizListRef.value) return
  quizListRef.value.handleAnswerSelected(payload)
}

const handleQuizFinished = (allCorrect) => {
  quizStatus.value = allCorrect ? 'success' : 'fail'
  selectedQuizQuestion.value = null
}

const selectedAnswer = computed(() => {
  if (!selectedQuizQuestion.value || !quizListRef.value) return null
  const answerObj = quizListRef.value.userAnswers.find(
    (a) => a.id === selectedQuizQuestion.value.quizId,
  )
  return answerObj?.selectedAnswer || null
})

const goToNextQuestion = () => {
  if (!quizListRef.value || !selectedQuizQuestion.value) return

  const questions = quizListRef.value.quizQuestionList
  const currentIndex = questions.findIndex(
    (q) => q.quizId === selectedQuizQuestion.value.quizId,
  )

  if (currentIndex !== -1 && currentIndex < questions.length - 1) {
    selectedQuizQuestion.value = questions[currentIndex + 1]
  } 
}

const resetQuiz = async() => {
  quizStatus.value = 'start'
  selectedQuizQuestion.value = null

  if (quizListRef.value && quizListRef.value.resetQuiz){
    await quizListRef.value.resetQuiz()
  }
}

</script>

<template>
  <main>
    <div class="grid">
      <QuizQuestionList
        ref="quizListRef"
        @select="selectedQuizQuestion = $event"
        class="question-list"
      />

      <div class="question-details">
        <transition name="grow-in" mode="out-in">
          <QuizQuestionDetails
            v-if="selectedQuizQuestion"
            :question="selectedQuizQuestion"
            :selected-answer="selectedAnswer"
            @close="selectedQuizQuestion = null"
            @answer-selected="handleAnswerSelected"
            @next-question="goToNextQuestion"
            @quiz-finished="handleQuizFinished"
          />
          <div v-else class="welcome-content">
            <template v-if="quizStatus === 'start'">
              <h2>Hello future hardware hero!</h2>
              <h2>Select a question from the list to learn more</h2>
            </template>

            <template v-else-if="quizStatus === 'success'">
              <h2>🎉 Congratulations! 🎉</h2>
              <h2>You aced this quiz!</h2>
            </template>

            <template v-else-if="quizStatus === 'fail'">
              <h2>😕 Better luck next time!</h2>
              <h2>Try again — you’ve got this!</h2>
              <button @click="resetQuiz" class="reset-btn"> 
                Restart quiz  
              </button>
            </template>
          </div>
        </transition>
      </div>
    </div>
  </main>
</template>

<style scoped>
.title-wrapper {
  padding-top: 60px;
}

.welcome-content {
  padding: 5rem 1rem;
  text-align: center;
  font-size: 1.3rem;
}

.question-list {
  background-color: #fef3c7;
  padding-top: 100px;
  padding-left: 25px;
}

.question-details {
  padding-top: 100px;
}

main {
  background-color: #fcd34d;
}

.grid {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 600px) and (min-width: 375px) {
  .grid { 
    grid-template-columns: 2fr;
    gap: 0;
  }
  main {
    margin: 0;
    background-color: #fcd34d;
    text-align: center;
  }
  body {
    padding: 0;
    margin: 0;
  }

  .question-list {
    padding: 20px 20px;
    -ms-flex-order: 2;
    order: 2;
  }

  .question-details {
    padding-top: 20px;
    -ms-flex-order: 1;
    order: 1;
  }

  .welcome-content {
    padding: 20px 20px;
  }
}
</style>
