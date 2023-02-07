import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { v4 as uuidv4 } from 'uuid'
import { useNotificationDispatch } from '../App'

const AnecdoteForm = () => {
  const dispatchNotification = useNotificationDispatch()
  const queryClient = useQueryClient()
  const createAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (err) => {
      dispatchNotification({ type: 'ADD_NEW', payload: err.response?.data?.error })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    event.target.anecdote.value = ''

    createAnecdoteMutation.mutate({ content, id: uuidv4(), votes: 0 })
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
