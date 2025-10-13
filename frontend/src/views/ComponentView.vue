<script setup>
import {useRoute} from 'vue-router'
const route = useRoute()
</script>

<template>
    <div class="user">
        <h1>User #{{ user.userName }}</h1>
        <p>Den här sidan visar usars med id: {{ user.userId }}</p>
    </div>
</template>



