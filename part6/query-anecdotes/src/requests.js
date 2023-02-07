import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async (newAnecdote) => {
  console.log(newAnecdote)
  const response = await axios.post(baseUrl, newAnecdote)

  console.log(newAnecdote, response)

  return response.data
}

export const updateAnecdote = async (updatedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
  console.log(response)
  return response.data
}
