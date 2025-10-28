<script setup>
import { ref, onMounted } from 'vue'



const emit = defineEmits(['select'])

const chapterId = 1 // eller få detta från props/route
const quizQuestionList = ref([])
const loading = ref(false)
const error = ref(null)



const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`http://localhost:3000/quizzes/${chapterId}`)
    if (!response.ok) throw new Error('Could not fetch quizzes: ' + response.status)
    const data = await response.json()
    quizQuestionList.value = data.data.map(q => ({
      chapterId: q.chapterId,
      quizQuestion: q.quizQuestion,
      quizRightAnswer: q.quizRightAnswer,
      quizWrongAnswer1: q.quizWrongAnswer1,
      quizWrongAnswer2: q.quizWrongAnswer2,
      status: null //'correct' | 'incorrect' | null
    }))
    console.log('Quizzes loaded:', quizQuestionList.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const selectQuizQuestion = (quiz) => {
  if(quiz.status === null) emit('select', quiz)
}

const handleSubmit = ({ questionId, isCorrect }) => {
  const question = quizQuestionList.value.find(q => q.quizId === questionId)
  if (question) question.status = isCorrect ? 'correct' : 'incorrect'
}

defineExpose({
  quizQuestionList, handleSubmit
})

onMounted(fetchData)
</script>

<template>
  <section>
    <p v-if="loading">Loading questions...</p>
    <p v-else-if="error" style="color: red">{{ error }}</p>

    <ul v-else class="question-list">
      <li
        v-for="question in quizQuestionList"
        :key="question.quizId"
        @click="selectQuizQuestion(question)"
        :class="question.status"
      >
        <h2>{{ question.quizQuestion }}</h2>
      </li>
    </ul>
  </section>
</template>

<style scoped>
ul {
  margin-top: 10px;
  list-style: none;
  padding: 95px;
  display: grid;
  grid-template-columns: 1fr;
}
li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 5px 5px;
  padding: 0;
  border-radius: 6px;
  cursor: pointer;
}
li.correct {
  background-color: #86efac;
  border-color: #16a34a;
}
li.incorrect {
  background-color: #fca5a5;
  border-color: #b91c1c;
}



@media (max-width: 600px) and (min-width: 375px) {
  .question-list {
  display: grid;
  grid-template-columns: 4fr, 2fr; 
  gap: 0.1rem;                          
  padding-left: 0px;                  
  padding-right: 0.5rem;
  justify-items: start;                   
  margin: 0;                              
  }
  li{
    justify-content: center;
  }


  .imgSettings {
    width: 70px;
    height: auto;
  }

  ul{
    justify-content: center;
    grid-template-columns: repeat(4, 2fr);
    gap: 0.25rem;
    padding: 0px;
    margin: 0 auto;

  };


}
</style>
