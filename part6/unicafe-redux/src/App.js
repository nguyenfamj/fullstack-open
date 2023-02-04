import React from 'react'
import { GOOD_ACTION, OK_ACTION, BAD_ACTION, RESET_ACTION } from './reducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const status = useSelector((state) => state)

  const increaseGOOD = () => {
    dispatch(GOOD_ACTION)
  }

  const increaseOK = () => {
    dispatch(OK_ACTION)
  }

  const increaseBAD = () => {
    dispatch(BAD_ACTION)
  }

  const resetCount = () => {
    dispatch(RESET_ACTION)
  }

  return (
    <div>
      <button onClick={increaseGOOD}>good</button>
      <button onClick={increaseOK}>ok</button>
      <button onClick={increaseBAD}>bad</button>
      <button onClick={resetCount}>reset stats</button>
      <div>good {status.good}</div>
      <div>ok {status.ok}</div>
      <div>bad {status.bad}</div>
    </div>
  )
}

export default App
