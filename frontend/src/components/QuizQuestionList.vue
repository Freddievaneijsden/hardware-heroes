<script setup>
import { ref } from 'vue'
import { useQuiz } from '@/composables/useQuiz'

const loading = ref(false)
const error = ref(null)
const { quizQuestionList, userAnswers, selectedChapterId, completedChapters} = useQuiz()

const emit = defineEmits(['select', 'quiz-finished'])

const handleAnswerSelected = ({ questionId, selectedAnswer }) => {
  const existing = userAnswers.value.find((a) => a.id === questionId)
  if (existing) {
    existing.selectedAnswer = selectedAnswer
  } else {
    userAnswers.value.push({ id: questionId, selectedAnswer })
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

defineExpose({
  quizQuestionList,
  userAnswers,
  handleAnswerSelected,
})
</script>

<template>
  <section>
    <section>
      <ul class="completed-list" v-if="completedChapters.length || selectedChapterId !== null">
        <li
          v-for="chapter in [
            ...new Set([...completedChapters, getLatestChapter()].filter((c) => c !== null)),
          ]"
          :key="chapter"
          v-if="chapter !== null"
          @click="selectChapter(chapter)"
          :class="{
            current: chapter === selectedChapterId,
            completed: completedChapters.includes(chapter),
          }"
        >
          <h2>
            {{
              completedChapters.includes(chapter)
                ? 'Completed Quiz ' + (chapter + 1)
                : 'Current Quiz ' + (chapter + 1)
            }}
          </h2>
        </li>
      </ul>
      <p v-else>Loading questions...</p>
    </section>

    <transition name="grow-in" mode="out-in">
      <section :key="selectedChapterId">
        <p v-if="loading">Loading questions...</p>
        <p v-else-if="error" style="color: red">{{ error }}</p>

        <ul v-else class="question-list">
          <li
            v-for="question in quizQuestionList"
            :key="question.quizId"
            :class="[
              question.status,
              { answered: userAnswers.find((a) => a.id === question.quizId) },
            ]"
            @click="emit('select', question)"
          >
            <h3>{{ question.quizQuestion }}</h3>
          </li>
        </ul>
      </section>
    </transition>
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
li.answered {
  background-color: #f3f4f6;
  border-color: #9ca3af;
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
    grid-template-columns: 1fr;
    gap: 0.1rem;
    padding-left: 0px;
    padding-right: 0.5rem;
    justify-items: start;
    margin: 0;
  }
  li {
    justify-content: center;
  }


  ul {
    justify-content: center;
    grid-template-columns: 2fr;
    gap: 0.25rem;
    padding: 0px;
    margin: 0 auto;
  }
}
</style>
