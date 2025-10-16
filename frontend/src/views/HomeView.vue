<script setup>
import UsersGet from '../components/UsersGet.vue'
import UsersCreate from '../components/UsersCreate.vue'
import UsersUpdate from '../components/UsersUpdate.vue'
import UsersDelete from '../components/UsersDelete.vue'
import Nav from '../components/Nav.vue'
import imageHome from '../assets/completeComputer-removebg-preview.png'
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
            <h2><RouterLink to="/hardwareKnowledge">Hardware Knowledge</RouterLink></h2>
          </li>
          <li>
            <h2><RouterLink to="/hardwareQuiz">Hardware Quiz</RouterLink></h2>
          </li>
          <li>
            <h2><RouterLink to="/Statistics">Statistics</RouterLink></h2>
          </li>
        </ul>

        <h2><RouterLink to="/aboutUs">About</RouterLink></h2>
      </div>
      <RouterLink to="/hardwareKnowledge"><img :src="imageHome" alt="Home Image" /></RouterLink>
    </main>
  </body>
</template>

<style scoped>
main {
  max-width: 200%;
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

ul {
  list-style: none;
  padding: 10px 0;
}

body {
  padding-top: 80px;
}
</style>
