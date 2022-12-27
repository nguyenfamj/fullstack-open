import React from 'react';
import './Notification.css';

const Notification = ({ message, success }) => {
  console.log(message, success);
  if (message === null) {
    return null;
  }

  if (success === true) {
    console.log(message);
    return <div className='message-box success-true'>{message}</div>;
  }

  if (success === false) {
    return <div className='message-box success-false'>{message}</div>;
  }
};

export default Notification;
