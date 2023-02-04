import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import counterReducer from './reducer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(counterReducer)

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
