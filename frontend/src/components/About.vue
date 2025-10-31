<script setup>
import boyBand from '../assets/img/boyBandNoBG.png'
</script>

<template>
  <div>
    <img :src="boyBand" :alt="BoyBand" />
    <div class="names-grid">
      <div class="names-wrapper">
        <h2>Jesper</h2>
        <h2>Oskar</h2>
      </div>
      <div class="names-wrapper">
        <h2>Freddie</h2>
        <h2>Max</h2>
      </div>
    </div>
  </div>
</template>

<style scope>
img {
  padding-top: 160px;
}
.names-wrapper {
  display: flex;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 65px;
}

.names-grid {
  display: grid;
  grid-template-columns: repeat(2, auto);
}

@media (max-width: 600px) and (min-width: 375px) {
  .names-wrapper {
    padding-left: 10px;
    padding-right: 30px;
  }

  img {
    max-width: 400px;
    padding-top: 80px;
  }
}
</style>
