import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ message, type = 'info', onClose, duration = 3000, position = 'left' }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeOutDuration = 500; // Duration of the fade-out effect in milliseconds
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - fadeOutDuration);

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(timer);
    };
  }, [onClose, duration]);

  return (
    <div className={`notification ${type} ${fadeOut ? 'fade-out' : ''} ${position}`}>
      {message}
    </div>
  );
};

export default Notification;
