<script setup>
import ProfileSettings from '@/components/ProfileSettings.vue'
</script>
<template>
  <main>
    <div class="sideBar">
      <ul>
        <li>
          <h2>
            <RouterLink to="/hardwareKnowledge" class="h2-side-menu">Hardware Knowledge</RouterLink>
          </h2>
        </li>
        <li>
          <h2><RouterLink to="/hardwareQuiz" class="h2-side-menu">Hardware Quiz</RouterLink></h2>
        </li>
        <li>
          <h2><RouterLink to="/Statistics" class="h2-side-menu">Statistics</RouterLink></h2>
        </li>
      </ul>
      <h2><RouterLink to="/aboutUs" class="h2-side-menu">About</RouterLink></h2>
    </div>
    <div>
      <ProfileSettings />
    </div>
  </main>
</template>

<style scoped>
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
  min-height: 90vh;
  max-width: 400px;
  padding: 20px 20px;
  margin-top: 40px;
}

ul {
  list-style: none;
  padding: 10px 0;
  margin-top: 60px;
}

html,
body {
  max-height: 80vh;
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
    min-height: 0vh;
    height: auto;
    margin-top: 0px;
    padding-top: 0px;
    margin: 0;
    height: auto;
    box-sizing: border-box;
  }
}
</style>
