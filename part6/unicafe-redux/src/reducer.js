const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return state
        ? { ...state, good: state.good + 1 }
        : { ...initialState, good: initialState.good + 1 }
    case 'OK':
      return state ? { ...state, ok: state.ok + 1 } : { ...initialState, ok: initialState.ok + 1 }
    case 'BAD':
      return state
        ? { ...state, bad: state.bad + 1 }
        : { ...initialState, bad: initialState.bad + 1 }
    case 'ZERO':
      return initialState
    default:
      return state
  }
}

// Action Type
export const GOOD_ACTION = {
  type: 'GOOD',
}

export const OK_ACTION = {
  type: 'OK',
}

export const BAD_ACTION = {
  type: 'BAD',
}
export const RESET_ACTION = {
  type: 'ZERO',
}

export default counterReducer
