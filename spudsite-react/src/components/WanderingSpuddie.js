import React, { useEffect, useState, useCallback } from 'react';
import './WanderingSpuddie.css'; // Import your character CSS file
import spudFront from '../img/SpudFront.png';
import spudBack from '../img/SpudBack.png';
import spudRight from '../img/SpudRight.png';
import spudLeft from '../img/SpudLeft.png';
import Chatbox from './Chatbox';

function Character() {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [direction, setDirection] = useState('down'); // Initialize with a default direction
  const [showChatbox, setShowChatbox] = useState(false); // State to control chatbox visibility


  // Function to generate random directions, intervals, and distances
  const randomMove = () => {
    const directions = ['up', 'down', 'left', 'right'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const randomInterval = Math.floor(Math.random() * (9000 - 3000) + 3000); // Random interval between 3 to 9 seconds
    const randomDistance = Math.floor(Math.random() * (100 - 50) + 50); // Random distance between 50 to 100 pixels
    return { direction: randomDirection, interval: randomInterval, distance: randomDistance };
  };
  
  // Function to clamp a value within a specified range with a buffer zone
  const clamp = (value, min, max, buffer) => {
    return Math.min(Math.max(value, min + buffer), max - buffer);
  };

  // Function to update character position with random distance
 // Wrap the moveCharacter function in useCallback to ensure its stability
 const moveCharacter = useCallback(() => {
    const { direction, distance } = randomMove();
    setDirection(direction); // Update the direction

    // Calculate new position based on the chosen direction and distance
    // Update state to trigger re-render with the new position
    // You can also apply CSS animations here
    setPosition((prevPosition) => {
      let newPosition = { ...prevPosition };
      const buffer = 40; // Adjust the buffer size as needed
      switch (direction) {
        case 'up':
          newPosition.top = clamp(newPosition.top - distance, 0, window.innerHeight, buffer);
          break;
        case 'down':
          newPosition.top = clamp(newPosition.top + distance, 0, window.innerHeight, buffer);
          break;
        case 'left':
          newPosition.left = clamp(newPosition.left - distance, 0, window.innerWidth, buffer);
          break;
        case 'right':
          newPosition.left = clamp(newPosition.left + distance, 0, window.innerWidth, buffer);
          break;
        default:
          break;
      }
      return newPosition;
    });
  }, []);

  const toggleChatbox = () => {
    setShowChatbox(!showChatbox);
  };

  // Use useEffect to trigger character movement at random intervals
  useEffect(() => {
    const { interval } = randomMove();
    const intervalId = setInterval(moveCharacter, interval);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [moveCharacter]); // Include an empty dependency array to run this effect only once


    // Render the character images based on the direction outside of useEffect
  return (
    <div >
        <div className={`character move-${direction}`} style={{ top: position.top, left: position.left, position: 'absolute' }} onClick={toggleChatbox}>
          {direction === 'up' && <img src={spudBack} style={{width: "10vw", height: "10vw", transition: "transform 1s ease-in-out" }} alt="Assistant Spud Back" />}
          {direction === 'down' && <img src={spudFront} style={{width: "10vw", height: "10vw", transition: "transform 1s ease-in-out" }} alt="Assistant Spud Front" />}
          {direction === 'left' && <img src={spudLeft} style={{width: "10vw", height: "10vw", transition: "transform 1s ease-in-out" }} alt="Assistant Spud Left" />}
          {direction === 'right' && <img src={spudRight} style={{width: "10vw", height: "10vw", transition: "transform 1s ease-in-out" }} alt="Assistant Spud Right" />}
        </div>
        <div>
          {showChatbox && (
           <Chatbox className="rocksalt"
              onClose={toggleChatbox} // Pass a function to close the chatbox
              style={{
                position: 'absolute',
                top: position.top, // Position the chatbox just below the character
                left: position.left +25, // Center the chatbox horizontally relative to the character
                transform: 'translateX(-50%)', // Adjust horizontal centering
                zIndex: 10, // Ensure the chatbox appears above other elements
             }}
            />
          )}
      </div>
    </div>
  );
}

export default Character;