import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const {
    data: anecdotes,
    isLoading,
    isError,
  } = useQuery('anecdotes', getAnecdotes, { retry: false })

  const handleVote = (anecdote) => {
    const preUpdatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }

    updateAnecdoteMutation.mutate(preUpdatedAnecdote)
  }

  if (isError) {
    return <h4>Anecdote service not available due to problems in server</h4>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {isLoading
        ? 'loading...'
        : anecdotes.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          ))}
    </div>
  )
}

export default App
