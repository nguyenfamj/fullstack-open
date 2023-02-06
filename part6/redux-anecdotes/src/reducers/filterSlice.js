import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter: (state, { payload: { data } }) => {
      console.log(data)
      return data
    },
  },
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer
