import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { appendAnecdotesArray } from './reducers/anecdoteSlice'

import anecdotesService from './services/anecdotes'

import { store } from './store'

const startUp = async () => {
  const data = await anecdotesService.getAnecdotes()

  store.dispatch(appendAnecdotesArray({ anecdotes: data }))
  console.log(data)
}

startUp().then(console.log('Fetched data successfully'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
