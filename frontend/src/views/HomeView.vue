<script setup>

import Nav from '../components/Nav.vue'
import imageHome from '../assets/img/imgcompleteComputer.png'


</script>

<template>
  <body>
    <header>
      <Nav/>
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
        <h2 class="about"><RouterLink to="/aboutUs">About Us</RouterLink></h2>
    </div>
      <div class="imgContainer">
        <RouterLink to="/hardwareKnowledge"> <img :src="imageHome" alt="Home Image" class="imageGlow" /></RouterLink>
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

ul {
  list-style: none;
  padding: 10px 0;
}

body {
  padding-top: 80px;
  background-color: #fcd34d;
}

@media (max-width: 600px) and (min-width: 375px) {
  
   main {
    margin-top: 50px;
    max-width: 100vw;
    width: 100vw;
    display: flex;
    flex-direction: column;
    
  }
  header{
    width: 100vw;
    max-width: 100vw;
    padding: 0;
    margin: 0;
  }

  .sideBar {
    width: 100%;
    max-width: 100%;
    height: auto;
    margin-top: 100p;
    margin: 0;
    height: auto;
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }
  ul{
    list-style: none;
    padding: 0px;
  }
  .about{
  }
  
}



</style>
