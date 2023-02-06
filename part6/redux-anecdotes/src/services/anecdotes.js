import axios from 'axios'
import { getId } from '../reducers/anecdoteSlice'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async ({ content }) => {
  const newAnecdote = { content, id: getId(), votes: 0 }

  const response = await axios.post(baseUrl, newAnecdote)
  console.log(response)
  return response.data
}

export default { getAnecdotes, createAnecdote }
