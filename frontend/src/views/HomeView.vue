<script setup>

import Nav from '../components/Nav.vue';
import imageHome from '../assets/completeComputer-removebg-preview.png'


</script>

<template>
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

    <h2 class="about"><RouterLink to="/aboutUs">About Us</RouterLink></h2>
    </div>
    <RouterLink to="/hardwareKnowledge"><img :src="imageHome" alt="Home Image" /></RouterLink>
  </main>
</template>

<style scoped>
main{
  max-width: 200%;
  margin: 0 auto;
  font-weight: normal;
  background-color: #FCD34D;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 2rem;
}
.sideBar{
  background-color: #FEF3C7;
  max-width: 400px;
  height: 100%;
  padding: 1rem;
}

@media (max-width: 600px) and (min-width: 375px) {
  

   main {
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
