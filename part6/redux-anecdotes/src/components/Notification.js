import { useDispatch, useSelector } from 'react-redux'
import { getNotificationState } from '../reducers/notificationSlice'

const Notification = () => {
  const notification = useSelector(getNotificationState)
  const dispatch = useDispatch()

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
