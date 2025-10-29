<script setup>
import { ref, onMounted } from 'vue'

const usersList = ref([])

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/users/with-progress')
    if (!response.ok) throw new Error('Could not fetch users: ' + response.status)
    const data = await response.json()
    usersList.value = data.data
    console.log('Users loaded:', usersList.value)
  } catch (err) {
    console.log(err.message)
  }
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
        <li><h2>Chapter</h2></li>
      </div>
      <li v-for="user in usersList" class="user-wrapper">
        <h2>{{ user.userName }}</h2>
        <h2>{{ user.progressChapterId }}/5</h2>
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
</style>
