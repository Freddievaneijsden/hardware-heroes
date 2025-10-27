import { ref } from 'vue'

const currentChapter = ref(null);

const createNewProgress = async (userId) => {
  try {
    const response = await fetch('http://localhost:3000/users/progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        progressUserId: userId,
        progressChapterId: 1,
      }),
    })

    const result = await response.json()

    if (!response.ok) throw new Error(result.error || 'Failed to create new progress')
  } catch (err) {
     console.error(err.message);
  }
}

const updateProgressChapter = async (userId, currentChapter) => {
    try {

    const newChapter = currentChapter + 1
    
    const response = await fetch(`http://localhost:3000/users/progress/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        progressChapterId: newChapter
      }),
    })

    const result = await response.json()

    if (!response.ok) throw new Error(result.error || 'Failed to update chapter')

    } catch (err) {
    console.error(err.message);
  }
}

const getCurrentChapter = async (userId) => {
    try {
    const response = await fetch(`http://localhost:3000/users/progress/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const result = await response.json()

    if (!response.ok) throw new Error(result.error || 'Failed to get progress by userId')
    
    currentChapter.value = result.data[0].progressChapterId;

    } catch (err) {
    console.error(err.message);
    }
}

export function useProgress() {
  return { createNewProgress, updateProgressChapter, getCurrentChapter, currentChapter}
}
