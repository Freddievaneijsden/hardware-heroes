<script setup>
import { ref, onMounted } from 'vue'



const emit = defineEmits(['select'])

const quizId = 1 // eller få detta från props/route
const quizQuestionList = ref([])
const loading = ref(false)
const error = ref(null)



const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`http://localhost:3000/quizzes/${quizId}`)
    if (!response.ok) throw new Error('Could not fetch quizzes: ' + response.status)
    const data = await response.json()
    quizQuestionList.value = data.data
    console.log('Quizzes loaded:', quizQuestionList.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const selectQuizQuestion = (quiz) => {
  emit('select', quiz)
}

onMounted(fetchData)
</script>

<template>
  <section>
    <p v-if="loading">Laddar komponenter...</p>
    <p v-else-if="error" style="color: red">{{ error }}</p>

    <ul v-else class="question-list">
      <li
        v-for="question in quizQuestionList"
        :key="question.quizId"
        @click="selectQuizQuestion(question)"
      >
      {{ question.quizQuestion }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
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
img {
  border-radius: px;
  object-fit: cover;
}

.imgSettings {
  width: 180px;
  height: auto;
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
