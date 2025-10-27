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
    error.value = err.message
  }
}

export function useProgress() {
  return { createNewProgress }
}
