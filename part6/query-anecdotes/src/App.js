import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'

import { createContext, useReducer, useContext } from 'react'

import { notificationReducer } from './reducers/notificationReducer'

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

const App = () => {
  const queryClient = useQueryClient()

  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  // React Query section
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch({ type: 'ADD_NEW', payload: `anecdote "${data.content}" voted` })
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
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
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
    </NotificationContext.Provider>
  )
}

export default App
