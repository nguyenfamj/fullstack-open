import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { v4 as uuidv4 } from 'uuid'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const createAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    event.target.anecdote.value = ''

    createAnecdoteMutation.mutate({ content, id: uuidv4(), votes: 0 })
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
