const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

export const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  if (action.type === 'VOTE') {
    const id = action.payload.id

    // Find the anecdote to modify
    const anecdoteToModify = state.find((anecdote) => anecdote.id === id)
    const modifiedAnecdote = {
      ...anecdoteToModify,
      votes: anecdoteToModify.votes + 1,
    }
    return state.map((anecdote) => (anecdote.id !== id ? anecdote : modifiedAnecdote))
  }

  if (action.type === 'CREATE_ANECDOTE') {
    return state.concat(action.payload)
  }

  return state
}

// List of action creator
export const increaseVote = (payload) => ({
  type: 'VOTE',
  payload,
})
export const createAnecdote = (payload) => ({
  type: 'CREATE_ANECDOTE',
  payload: { ...payload, id: getId() },
})

export default reducer
