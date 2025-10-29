<script setup>
import { ref, onMounted } from 'vue'

const usersList = ref([])

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/users')
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
          <p>Name</p>
        </li>
        <li><p>Chapter</p></li>
      </div>
      <li v-for="user in usersList" class="user-wrapper">
        <p>{{ user.userName }}</p>
        <p>2</p>
      </li>
    </ul>
  </div>
</template>

<style scope>
.title-wrapper {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding-right: 20px;
}

.user-wrapper {
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
}

ul {
  list-style: none;
  padding-top: 80px;
}
</style>
