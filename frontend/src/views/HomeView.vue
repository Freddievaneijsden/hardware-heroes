<script setup>
import UsersGet from '../components/UsersGet.vue'
import UsersCreate from '../components/UsersCreate.vue'
import UsersUpdate from '../components/UsersUpdate.vue'
import UsersDelete from '../components/UsersDelete.vue'
import Nav from '../components/Nav.vue'
import imageHome from '../assets/img/imgcompleteComputer.png'
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
      <div class="imgContainer">
        <RouterLink to="/hardwareKnowledge"
          ><img :src="imageHome" alt="Home Image" class="imageGlow"
        /></RouterLink>
      </div>
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

.imgContainer {
  display: flex;
  align-items: center;
  padding-left: 50px;
}

.imageGlow {
  transition: all 0.5s ease;
}

.imageGlow:hover {
  box-shadow: 0 0 25px 10px #ec4899;
  border-radius: 20px;
  transform: scale(1.05);
}

ul {
  list-style: none;
  padding: 10px 0;
}

body {
  padding-top: 80px;
}
</style>
