import React from 'react'
import './Notification.css'
import PropTypes from 'prop-types'

const Notification = ({ message, success }) => {
  console.log(message, success)
  if (message === null) {
    return null
  }

  if (success === true) {
    console.log(message)
    return <div className='message-box success-true'>{message}</div>
  }

  if (success === false) {
    return <div className='message-box success-false'>{message}</div>
  }
}

Notification.propTypes = { message: PropTypes.string, success: PropTypes.bool }

export default Notification
