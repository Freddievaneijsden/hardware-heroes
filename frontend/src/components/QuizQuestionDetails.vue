<script setup>

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close'])

</script>

<template>
  <section class="details">
    <h2>{{ question.quizQuestion }}</h2>
    <div class="article-content">
      <ul>
        <li>{{ question.quizWrongAnswer1 }}</li>
        <li>{{ question.quizWrongAnswer2 }}</li>
        <li>{{ question.quizRightAnswer }}</li>
      </ul>
      
      <button @click="emit('close')">Close</button>
    </div>
  </section>
</template>

<style scoped>
.details {
  padding: 1rem;
}

h2 {
  font-size: 32px;
  text-align: center;
}

.article-text {
  white-space: pre-line;
}

.article-content {
  text-align: justify;
  line-height: 1.6;
  padding: 0 80px;
}

.article-image {
  float: left;
  margin: 0 10px 10px 0;
  max-width: 200px;
  height: auto;
  object-fit: cover;
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
  }
  
}
</style>
