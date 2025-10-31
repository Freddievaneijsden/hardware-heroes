<script setup>
import { onMounted } from 'vue'
import Nav from '../components/Nav.vue'
import ProgressComponent from '@/components/ProgressComponentBar.vue'
import { useQuizProgress } from '@/composables/useQuizProgress'
import ShowCertificate from '../components/ShowCertificate.vue'
import { getCurrentUser } from '../composables/getCurrentUser.js'

const { fetchQuizLevel, levelImage, quizLevel } = useQuizProgress()
const user = getCurrentUser()

onMounted(() => {
  fetchQuizLevel()
})
</script>
<template>
  <body>
    <header>
      <Nav />
    </header>
    <main>
      <div class="sideBar">
        <ul>
          <li>
            <h2>
              <RouterLink to="/hardwareKnowledge" class="h2-side-menu"
                >Hardware Knowledge</RouterLink
              >
            </h2>
          </li>
          <li>
            <h2><RouterLink to="/hardwareQuiz" class="h2-side-menu">Hardware Quiz</RouterLink></h2>
          </li>
          <li v-if="user.roleId.value === 2">
            <h2>
              <RouterLink to="/Statistics" class="h2-side-menu">Students Progress</RouterLink>
            </h2>
          </li>
        </ul>
        <h2><RouterLink to="/about" class="h2-side-menu">About</RouterLink></h2>
      </div>
      <div class="imgContainer">
        <RouterLink to="/hardwareKnowledge">
          <img :src="levelImage" alt="Home Image" class="imageGlow" />
        </RouterLink>
        <ShowCertificate />
        <ProgressComponent :currentLevel="quizLevel" class="progressBar" />
      </div>
    </main>
  </body>
</template>

<style scoped>
img {
  margin-top: 20px;
  min-width: 400px;
  max-width: 400px;
  height: auto;
}

.progressBar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150%;
}

main {
  max-width: 100%;
  width: 100%;
  min-height: 90vh;
  margin: 0 auto;
  font-weight: normal;
  background-color: #fcd34d;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.sideBar {
  background-color: #fef3c7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 400px;
  padding: 20px 20px;
}

.imgContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  padding-right: 300px;
  margin-top: 50px;
}

ul {
  list-style: none;
  padding: 10px 0;
}

body {
  padding-top: 80px;
  background-color: #fcd34d;
  overflow-x: hidden;
}

@media (max-width: 600px) and (min-width: 375px) {
  main {
    max-width: 100vw;
    width: 100vw;
    display: flex;
    flex-direction: column;
  }
  header {
    width: 100vw;
    max-width: 100vw;
    padding: 0;
    margin: 0;
  }

  body {
    padding: 0;
    margin: 0;
  }

  .sideBar {
    width: 100%;
    max-width: 100%;
    height: auto;
    margin-top: 0px;
    padding-top: 0px;
    margin: 0;
    height: auto;
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }
  ul {
    list-style: none;
    padding: 0px;
  }
  .imgContainer {
    padding-top: 20px;
    margin-top: 20px;
    padding-right: 30px;
  }

  .progressBar {
    width: 90%;
    margin: 10px auto 20px auto;
  }
}
</style>
