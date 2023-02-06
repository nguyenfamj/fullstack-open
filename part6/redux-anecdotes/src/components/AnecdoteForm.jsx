import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteSlice'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createContent = async (event) => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''
    const newAnecdote = await anecdotesService.createAnecdote({ content })

    console.log(newAnecdote)
    dispatch(createAnecdote(newAnecdote))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createContent}>
        <div>
          <input name='content' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
