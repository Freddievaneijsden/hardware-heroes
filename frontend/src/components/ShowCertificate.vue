<script setup>
import { ref } from 'vue'
import imageCertificate from '../assets/img/certificate.png'

const allChapthersCompleted = ref(true)
const success = ref(false)
const error = ref(false)

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
</script>

<template>
  <div>
    <button
      @click="downloadCertificate"
      :style="{ visibility: allChapthersCompleted ? 'visible' : 'hidden' }"
    >
      Download Certificate
    </button>
  </div>
</template>

<style scope>
button {
  margin: 20px;
}
</style>
