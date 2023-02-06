import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteSlice'
import { addNotification } from '../reducers/notificationSlice'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote)
  const filter = useSelector((state) => state.filter)

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(increaseVote({ id: anecdote.id }))

    dispatch(addNotification({ data: `you voted "${anecdote.content}"` }))
  }
  return (
    <div>
      {anecdotes
        .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
