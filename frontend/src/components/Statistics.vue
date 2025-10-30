<script setup>
import { ref, onMounted } from 'vue'
import ProgressComponent from '@/components/ProgressComponentBar.vue'

const usersList = ref([])
const usersWithRoleStudent = ref([])

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/users/with-progress')
    if (!response.ok) throw new Error('Could not fetch users: ' + response.status)
    const data = await response.json()
    usersList.value = data.data

    removeAllNonStudentUsers()
  } catch (err) {
    console.log(err.message)
  }
}

function removeAllNonStudentUsers() {
  usersWithRoleStudent.value = usersList.value.filter((user) => user.rolesId === 1)
}

onMounted(fetchData)
</script>

<template>
  <div>
    <ul>
      <div class="title-wrapper">
        <li>
          <h2>Name</h2>
        </li>
      </div>
      <li v-for="user in usersWithRoleStudent" class="user-wrapper">
        <h2>{{ user.userName }}</h2>
        <ProgressComponent :currentLevel="user.progressChapterId" class="progressBar" />
      </li>
    </ul>
  </div>
</template>

<style scope>
.title-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 20px 150px;
}

.user-wrapper {
  display: flex;
  justify-content: space-between;
  padding-right: 175px;
  padding-left: 150px;
  font-weight: none;
}

.user-wrapper h2 {
  font-weight: normal;
  margin: 3px;
}

ul {
  list-style: none;
  padding: 100px 200px;
}

.progressBar {
  width: 300px;
  padding: 2px;
}

@media (max-width: 600px) and (min-width: 375px) {
  ul {
    padding: 20px;
    justify-content: center;
  }

  .title-wrapper {
    padding: 10px 0;
    display: flex;
    justify-content: center;
  }

  .title-wrapper h2 {
    font-size: 1.2rem;
  }

  .user-wrapper {
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
  }

  .user-wrapper h2 {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  .progressBar {
    width: 80%;
    display: flex;
    justify-content: center;
  }
}
</style>
