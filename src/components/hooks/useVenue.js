import { useState, useEffect } from 'react';
import { generateRandomPosition } from '../GTVenue/gameUtils';
import { VENUES } from '../GTVenue/constants';


export const useVenue = (board, playerPos) => {
  const [currentVenue, setCurrentVenue] = useState(null);
  const [lastVenueName, setLastVenueName] = useState('');

  const setNewVenue = () => {
    if (!board || board.length === 0) {
      console.log('Board not initialized when setting new venue');
      return;
    }

    // Filter out the last venue to prevent repetition
    const availableVenues = VENUES.filter((venue) => venue !== lastVenueName);
    const randomVenue =
      availableVenues[Math.floor(Math.random() * availableVenues.length)];
    const position = generateRandomPosition(board, playerPos);

    if (position) {
      setLastVenueName(randomVenue);
      setCurrentVenue({ name: randomVenue, position });
    }
  };

  useEffect(() => {
    if (board && board.length > 0) {
      setNewVenue();
    }
  }, [board]);

  return { currentVenue, setNewVenue };
};
