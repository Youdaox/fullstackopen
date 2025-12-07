const baseURL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseURL)
  if (!response.ok) {
    throw new Error('serverError')
  }
  return await response.json()
}

export const createAnecdote = async (newAnecote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecote)
  }
  if (newAnecote.content.length < 5) {
    throw new Error('serverError')
  }
  const response = await fetch(baseURL, options)

  if (!response.ok) {
    throw new Error('serverError')
  }
  return await response.json()
}

export const addVote = async (anecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  }

  const response = await fetch(`${baseURL}/${anecdote.id}`, options)

  if (!response.ok) {
    throw new Error('serverError')
  }

  return await response.json()
}