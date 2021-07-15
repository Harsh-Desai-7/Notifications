import React, { useState, useEffect } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './app.css';

function Notifications() {
  const { Toast } = ReactBootstrap;
  const [notifications, setNotification] = useState([]);
  let timer = 0;
  function stop() {
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }
  }
  const update = () => {
    fetch('http://localhost:8000/api/getNotificationsUpdate')
      .then(response => response.json()).then((response) => {
        const newresponse = response.invites.map(i => ({ ...i, isActive: true }));
        setNotification(newresponse);
        stop();
      });
  };
  useEffect(() => {
    fetch('http://localhost:8000/api/getNotifications')
      .then(response => response.json()).then((response) => {
        const newresponse = response.invites.map(i => ({ ...i, isActive: true }));
        setNotification(newresponse);
        timer = setTimeout(() => update(), 10 * 1000);
      });
  }, []);
  function ToLocalDate(time) {
    const date = new Date(time * 1000);
    return date.toLocaleString();
  }
  const handleClose = (id) => {
    let tempState = notifications;
    console.log(id);
    tempState = tempState.map((invite) => {
      if (invite.invite_id === id) {
        // eslint-disable-next-line no-param-reassign
        invite.isActive = false;
      }
      return invite;
    });
    console.log(tempState);
    setNotification(tempState);
  };
  return (
    <div className="container">
      {notifications.map((invite, key) => (
        // eslint-disable-next-line max-len
        <Toast id={key} show={invite.isActive} onClose={() => handleClose(invite.invite_id)} delay={7000} autohide>
          <Toast.Header>
            <strong className="me-auto">{invite.sender_id}</strong>
            <small>
              {ToLocalDate(invite.invite_time)}
              {' '}
              mins ago
            </small>
          </Toast.Header>
          <Toast.Body>
            {' '}
            {invite.invite}
          </Toast.Body>
        </Toast>
      ))}
    </div>
  );
}

export default Notifications;
