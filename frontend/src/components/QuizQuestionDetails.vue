<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  selectedAnswer: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['close', 'answer-selected'])

const selectedAnswer = ref(props.selectedAnswer)

const selectAnswer = (answer) => {
  selectedAnswer.value = answer
  emit('answer-selected', { questionId: props.question.quizId, selectedAnswer: answer })
}

watch(
  () => props.selectedAnswer,
  (newVal) => {
    selectedAnswer.value = newVal
  },
  { immediate: true },
)
</script>

<template>
  <transition name="grow-in" mode="out-in">
    <section class="details" :key="question.quizId">
      <h2>{{ question.quizQuestion }}</h2>

      <ul class="answers">
        <li
          v-for="(answer, i) in [
            question.quizWrongAnswer1,
            question.quizWrongAnswer2,
            question.quizRightAnswer,
          ]"
          :key="i"
          :class="{ selected: selectedAnswer === answer }"
          @click="selectAnswer(answer)"
        >
          <h3>{{ answer }}</h3>
        </li>
      </ul>

      <button @click="emit('close')">Close</button>
    </section>
  </transition>
</template>

<style scoped>
.details {
  position: fixed;
  padding: 1rem;
}

.answers {
  display: grid;
  list-style: none;
}

li {
  background: #fef3c7;
  border: 2px solid #fbbf24;
  border-radius: 8px;
  padding: 0.8rem;
  cursor: pointer;
  transition: background 0.2s;
}

li.selected {
  background: #fde68a;
  border-color: #f59e0b;
}

h2 {
  font-size: 32px;
  text-align: center;
}

ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  list-style: none;
  padding: 0;
}

.article-text {
  white-space: pre-line;
}

.article-content {
  text-align: justify;
  line-height: 1.6;
  padding: 0 80px;
}

button {
  margin-top: 10px;
}

@media (max-width: 600px) and (min-width: 375px) {
  .article-content {
    padding: 0 10px;
  }

  .details {
    padding: 0;
    position: relative;
  }
}
</style>
