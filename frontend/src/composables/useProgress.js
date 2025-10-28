import { ref } from 'vue'

const userId = ref(null);

const loadUser = () => {
  try {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      userId.value = parsedUser.userId
    }
  } catch (err) {
    console.error('Failed to load user from storage:', err)
  }
}

const createNewProgress = async (userId) => {
  try {
    const response = await fetch('http://localhost:3000/users/progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        progressUserId: userId,
        progressChapterId: 0,
      }),
    })

    const result = await response.json()

    if (!response.ok) throw new Error(result.error || 'Failed to create new progress')
  } catch (err) {
     console.error(err.message);
  }
}

const updateProgressChapter = async (currentChapter) => {
    try {

    const newChapter = currentChapter + 1
    
    const response = await fetch(`http://localhost:3000/users/progress/${userId.value}`, {
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

const getCurrentChapter = async () => {
    try {
    const response = await fetch(`http://localhost:3000/users/progress/${userId.value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const result = await response.json()

    if (!response.ok) throw new Error(result.error || 'Failed to get progress by userId')
    
    const chapter = result.data?.[0]?.progressChapterId ?? null;;

    return chapter;

    } catch (err) {
    console.error(err.message);
    }
}

export function useProgress() {
  loadUser();
  return { createNewProgress, updateProgressChapter, getCurrentChapter, userId }
}
