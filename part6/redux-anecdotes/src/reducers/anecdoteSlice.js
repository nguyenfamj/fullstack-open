import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateVote: (state, { payload: { updatedAnecdote } }) => {
      return state.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
    },

    setAnecdotes: (state, { payload }) => {
      return payload
    },

    appendAnecdote: (state, { payload: { anecdote } }) => {
      state.push(anecdote)
    },
  },
})

export const { updateVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = ({ content }) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.postAnecdote({ content })

    dispatch(appendAnecdote({ anecdote: newAnecdote }))
  }
}

export const increaseVote = ({ anecdote }) => {
  return async (dispatch) => {
    console.log(anecdote)
    const preUpdatedAnecdote = { ...anecdote, votes: Number(anecdote.votes) + 1 }

    console.log(preUpdatedAnecdote)

    const updatedAnecdote = await anecdotesService.putAnecdote({
      updatedAnecdote: preUpdatedAnecdote,
    })

    console.log(updatedAnecdote)
    dispatch(updateVote({ updatedAnecdote }))
  }
}

export default anecdoteSlice.reducer
