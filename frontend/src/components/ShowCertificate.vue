<script setup>
import { ref, onMounted } from 'vue'
import imageCertificate from '../assets/img/certificate.png'
import downloadArrow from '../assets/svg/downloadArrow.svg'
import { useProgress } from '@/composables/useProgress'

const allChapthersCompleted = ref(false)
const success = ref(false)
const error = ref(false)
const progress = useProgress()

const downloadCertificate = () => {
  success.value = false
  error.value = false

  try {
    const link = document.createElement('a')
    link.href = imageCertificate
    link.download = 'certificate.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    success.value = true
    console.log('Download: ' + success.value)
  } catch (err) {
    console.error('Download failed:', err)
    error.value = true
  }
}

async function checkIfAllChaptersCompleted() {
  const currentChapter = await progress.getCurrentChapter()
  if (currentChapter === 5) {
    allChapthersCompleted.value = true
  }
}

onMounted(() => {
  checkIfAllChaptersCompleted()
})
</script>

<template>
  <div>
    <button
      class="download-button"
      @click="downloadCertificate"
      :style="{ visibility: allChapthersCompleted ? 'visible' : 'hidden' }"
    >
      Download Certificate
      <img :src="downloadArrow" alt="Download icon" class="download-icon" />
    </button>
  </div>
</template>

<style scope>
.download-button {
  margin: 20px;
  display: inline-flex;
  gap: 4px;
}

.download-icon {
  width: 20px;
  height: 20px;
}

@media (max-width: 600px) and (min-width: 375px){
.download-button {
  margin: 0px;
  display: inline-flex;
  gap: 4px;
  font-size:13px;
}

.download-icon {
  width: 15px;
  height: 15px;
}

}
</style>
