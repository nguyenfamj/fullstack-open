import { useNotificationValue, useNotificationDispatch } from '../App'

const Notification = () => {
  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()

  if (notification) {
    setTimeout(() => {
      dispatch({ type: 'REMOVE' })
    }, 5000)
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }
  if (!notification) {
    return <></>
  }

  return <div style={style}>{notification}</div>
}

export default Notification
