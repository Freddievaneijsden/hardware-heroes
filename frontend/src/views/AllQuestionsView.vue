<script setup>
import { ref } from 'vue'
import QuizQuestionDetails from '@/components/QuizQuestionDetails.vue'
import QuizQuestionList from '@/components/QuizQuestionList.vue'

const selectedQuizQuestion = ref(null)
const quizListRef = ref(null)

const handleSubmit = (payload) => {
  if(!payload) return
  quizListRef.value.handleSubmit(payload)
  selectedQuizQuestion.value = null
}


</script>

    <template>
  <main>
    <div class="grid">
      <QuizQuestionList ref="quizListRef" @select="selectedQuizQuestion = $event"  class="question-list"/>

      <div class="question-details">
        <QuizQuestionDetails
          v-if="selectedQuizQuestion"
          :question="selectedQuizQuestion"
          @close="selectedQuizQuestion = null"
          @answer-selected="quizListRef.handleAnswerSelected($event)"         
          />
        <div v-else class="welcome-content">
          <h2>Hello future hardware hero!</h2>
          <h2>Select a question from the list to learn more</h2>
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
