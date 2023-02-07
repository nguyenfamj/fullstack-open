export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NEW':
      return action.payload

    case 'REMOVE':
      return ''

    default:
      return state
  }
}
