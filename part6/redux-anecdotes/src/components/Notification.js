import { useDispatch, useSelector } from 'react-redux'
import { removeNotification, getNotificationState } from '../reducers/notificationSlice'

const Notification = () => {
  const notification = useSelector(getNotificationState)
  const dispatch = useDispatch()

  if (notification) {
    console.log(notification)
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  console.log(notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: '20px',
  }
  return <>{notification && <div style={style}>{notification}</div>}</>
}

export default Notification
