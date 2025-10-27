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
        <li > <h3>{{ question.quizWrongAnswer1 }} </h3></li>
        <li> <h3>{{ question.quizWrongAnswer2 }} </h3></li>
        <li> <h3>{{ question.quizRightAnswer }} </h3></li>
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
  }
  
}
</style>
