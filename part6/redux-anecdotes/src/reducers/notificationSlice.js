import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification: (action, { payload: { data } }) => {
      console.log(data)
      return data
    },

    removeNotification: (action, payload) => {
      return ''
    },
  },
})

export const getNotificationState = (state) => state.notification

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
