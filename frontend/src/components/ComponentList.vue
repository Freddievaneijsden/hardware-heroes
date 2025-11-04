<script setup>
import { ref, onMounted } from 'vue'

import imageCpu from '../assets/img/imgcpu.png'
import imageGpu from '../assets/img/imggpu.png'
import imageMotherboard from '../assets/img/imgmotherboard.png'
import imageCooling from '../assets/img/imgcooling.png'
import imageRam from '../assets/img/imgram.png'
import imagePSU from '../assets/img/imgpsu.png'
import imageChassi from '../assets/img/imgchassi.png'
import imageHarddrive from '../assets/img/imgharddrive.png'

const emit = defineEmits(['select'])

const componentList = ref([])
const loading = ref(false)
const error = ref(null)

const imageMap = {
  imageCpu: imageCpu,
  imageGpu: imageGpu,
  imageMotherboard: imageMotherboard,
  imageCooling: imageCooling,
  imageRam: imageRam,
  imagePSU: imagePSU,
  imageChassi: imageChassi,
  imageHarddrive: imageHarddrive,
}

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('http://localhost:3000/components')
    if (!response.ok) throw new Error('Could not fetch components: ' + response.status)
    const data = await response.json()

    const componentsWithArticles = await Promise.all(
      data.data.map(async (component) => {
        try {
          const articleResponse = await fetch(
            `http://localhost:3000/articles/component/${component.componentId}`,
          )
          if (articleResponse.ok) {
            const articleData = await articleResponse.json()
            return {
              ...component,
              articles: articleData.data || [],
            }
          }
          return {
            ...component,
            articles: [],
          }
        } catch (err) {
          console.warn(`Could not fetch articles for component ${component.componentId}:`, err)
          return {
            ...component,
            articles: [],
          }
        }
      }),
    )

    componentList.value = componentsWithArticles
    console.log('Components with articles loaded:', componentList.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const selectComponent = (component) => {
  emit('select', component)
}

onMounted(fetchData)
</script>

<template>
  <section>
    <p v-if="loading">Laddar komponenter...</p>
    <p v-else-if="error" style="color: red">{{ error }}</p>

    <transition-group name="grow-in" tag="ul" class="component-list" mode="out-in">
      <li
        v-for="component in componentList"
        :key="component.componentId"
        @click="selectComponent(component)"
      >
        <div class="componentImg-wrapper">
          <img
            class="imageGlow imgSettings"
            v-if="component.componentImg"
            :src="imageMap[component.componentImg]"
            :alt="component.componentName"
          />
        </div>
      </li>
    </transition-group>
  </section>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 5px 5px;
  padding: 0;
  border-radius: 6px;
  cursor: pointer;
}
img {
  border-radius: px;
  object-fit: cover;
}

.imgSettings {
  width: 180px;
  height: auto;
}

@media (max-width: 600px) and (min-width: 375px) {
  .component-list {
    display: grid;
    grid-template-columns: 4fr, 2fr;
    gap: 0.1rem;
    padding-left: 0px;
    padding-right: 0.5rem;
    justify-items: start;
    margin: 0;
  }
  li {
    justify-content: center;
  }

  .imgSettings {
    width: 70px;
    height: auto;
  }

  ul {
    justify-content: center;
    grid-template-columns: repeat(4, 2fr);
    gap: 0.25rem;
    padding: 0px;
    margin: 0 auto;
  }
}
</style>
