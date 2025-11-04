<script setup>
import { computed, ref } from 'vue'
import QuizQuestionDetails from '@/components/QuizQuestionDetails.vue'
import QuizQuestionList from '@/components/QuizQuestionList.vue'

const selectedQuizQuestion = ref(null)
const quizListRef = ref(null)
const quizStatus = ref("start")

const handleSubmit = (payload) => {
  if(!payload) return
  quizListRef.value.handleSubmit(payload)
  selectedQuizQuestion.value = null
}
const handleAnswerSelected = (payload) => {
  if (!quizListRef.value) return
  quizListRef.value.handleAnswerSelected(payload)
}

const handleQuizFinished = (allCorrect) => {
  quizStatus.value = allCorrect ? "success" : "fail"
  selectedQuizQuestion.value = null
}

const selectedAnswer = computed(() => {
  if (!selectedQuizQuestion.value || !quizListRef.value) return null
  const answerObj = quizListRef.value.userAnswers.find(a => a.id === selectedQuizQuestion.value.quizId)
  return answerObj?.selectedAnswer || null
})

</script>

<template>
  <main>
    <div class="grid">
      <QuizQuestionList 
      ref="quizListRef" 
      @select="selectedQuizQuestion = $event" 
      @quiz-finished="handleQuizFinished"
      class="question-list"/>

      <div class="question-details">
        <QuizQuestionDetails
          v-if="selectedQuizQuestion"
          :question="selectedQuizQuestion"
          :selected-answer="selectedAnswer"
          @close="selectedQuizQuestion = null"
          @answer-selected="handleAnswerSelected"
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
          </template>
        </div>
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
    grid-template-columns: 1fr 2fr;
    gap: 0;
  }
  main{
    margin: 0;
    background-color: #fcd34d;
  }
  body{
    padding: 0;
    margin: 0;
  }

  .question-list {
    padding: 20px 20px;
  }

  .question-details {
  padding-top: 20px;
}

.welcome-content {
  padding: 20px 20px;
}



}

</style>
