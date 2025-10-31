<script setup>
import { ref, onMounted } from 'vue'
import { useProgress } from '@/composables/useProgress'

const completedChapters = ref([])
const selectedChapterId = ref(null)
const quizQuestionList = ref([])
const loading = ref(false)
const error = ref(null)

const {getCurrentChapter, updateProgressChapter } = useProgress()

const emit = defineEmits(['select'])


const fetchData = async () => {
  if (selectedChapterId.value === null) return
  loading.value = true
  error.value = null

  try {
    const chapterToFetch = selectedChapterId.value + 1

    const response = await fetch(`http://localhost:3000/quizzes/${chapterToFetch}`)
    if (!response.ok) throw new Error('Could not fetch quizzes: ' + response.status)
    const data = await response.json()

    quizQuestionList.value = data.data.map(q => ({
      quizId: q.quizId,
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

const handleSubmit = async ({ questionId, isCorrect }) => {
  const question = quizQuestionList.value.find(q => q.quizId === questionId)
  if (question) question.status = isCorrect ? 'correct' : 'incorrect'

  const allAnswered = quizQuestionList.value.every(q => q.status !== null)
  const allCorrect = quizQuestionList.value.every(q => q.status === 'correct')

    if (allAnswered && allCorrect) {
      console.log('🎉 All questions correct! Advancing to next chapter...')
      await updateProgressChapter(selectedChapterId.value)

      if (!completedChapters.value.includes(selectedChapterId.value)) {
      completedChapters.value.push(selectedChapterId.value)
      }

      const newChapter = await getCurrentChapter() 
      if (newChapter !== selectedChapterId.value) {
        selectedChapterId.value = newChapter 
        await fetchData()
    }
  }
}

const selectChapter = async (chapterIndex) => {
  selectedChapterId.value = chapterIndex
  await fetchData()
}

const getLatestChapter = () => {
  const maxChapter = 5
  for (let i = 0; i < maxChapter; i++) {
    if (!completedChapters.value.includes(i)) return i
  }
  return null
}



onMounted(async () => {
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
})

defineExpose({
  quizQuestionList, handleSubmit
})

</script>

<template>
  <section>
    <section>
      <ul class="completed-list" v-if="completedChapters.length || selectedChapterId !== null">
        <li
          v-for="chapter in [...new Set([...completedChapters, getLatestChapter()].filter(c => c !== null))]"
          :key="chapter"
          v-if="chapter !== null"
          @click="selectChapter(chapter)"
          :class="{ current: chapter === selectedChapterId, completed: completedChapters.includes(chapter) }"
        >
          <h2>{{ completedChapters.includes(chapter) ? 'Completed Quiz ' + (chapter + 1) : 'Current Quiz ' + (chapter + 1) }}</h2>
        </li>
      </ul>
    </section>

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
  </section>
</template>

<style scoped>
ul {
  margin-top: 10px;
  list-style: none;
  padding: 40px;
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
