<script setup>
import { ref } from 'vue'

const output = ref('Test')
</script>

<template>
  <header>
    <h1>Hardware Heros</h1>
    <div class="btnWrapper">
      <button>Home</button>
      <button>Login</button>
    </div>
  </header>
</template>

<style >

h1 {
  color:#000000;
  text-align: center;
}

header {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  background-color: #14B8A6;
  padding: 10px 20px;
  gap: 700px;
}

.btnWrapper {
  display: flex;
  gap: 10px;
  height: 32px
}
button{
    font-weight: bold;
    border-radius: 20%;
    background-color: #EC4899;
}


</style>
