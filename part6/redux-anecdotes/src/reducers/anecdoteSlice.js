import { createSlice } from '@reduxjs/toolkit'

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    increaseVote: (state, { payload: { id } }) => {
      console.log(id)
      // Find the anecdote to modify
      const anecdoteToModify = state.find((anecdote) => anecdote.id === id)
      const modifiedAnecdote = {
        ...anecdoteToModify,
        votes: anecdoteToModify.votes + 1,
      }

      return state.map((anecdote) => (anecdote.id !== id ? anecdote : modifiedAnecdote))
    },

    createAnecdote: (state, { payload }) => {
      console.log(payload)
      state.push(payload)
    },

    appendAnecdotesArray: (state, { payload: { anecdotes } }) => {
      return [...state, ...anecdotes]
    },
  },
})

export const { increaseVote, createAnecdote, appendAnecdotesArray } = anecdoteSlice.actions
export default anecdoteSlice.reducer
