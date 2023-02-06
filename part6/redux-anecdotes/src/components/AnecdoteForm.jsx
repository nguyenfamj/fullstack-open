import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteSlice'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createContent = (event) => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''

    dispatch(createAnecdote({ content, votes: 0 }))
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
