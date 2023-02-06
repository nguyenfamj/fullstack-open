import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteSlice'
import filterReducer from './reducers/filterSlice'
import notificationReducer from './reducers/notificationSlice'

export const store = configureStore({
  reducer: { anecdote: anecdoteReducer, filter: filterReducer, notification: notificationReducer },
})
