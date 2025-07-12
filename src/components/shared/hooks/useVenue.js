import { useState, useEffect, useCallback } from 'react';
import { generateRandomPosition } from '../../games/GTVenue/gameUtils';
import { VENUES } from '../../games/GTVenue/constants';
import { isAccessible } from '../../games/GTVenue/pathfinding';


export const useVenue = (board, playerPos) => {
  const [currentVenue, setCurrentVenue] = useState(null);
  const [lastVenueName, setLastVenueName] = useState('');

  const setNewVenue = useCallback(() => {
    if (!board || board.length === 0) {
      console.log('Board not initialized when setting new venue');
      return;
    }

    // Filter out the last venue to prevent repetition
    const availableVenues = VENUES.filter((venue) => venue !== lastVenueName);
    const randomVenue =
      availableVenues[Math.floor(Math.random() * availableVenues.length)];
    
    // Try to find a valid position
    let position = generateRandomPosition(board, { x: 1, y: 1 }); // Use starting position instead of current playerPos

    // If no position found, try to find any accessible floor tile
    if (!position) {
      console.log('Trying fallback venue placement...');
      for (let y = 1; y < board.length - 1; y++) {
        for (let x = 1; x < board[0].length - 1; x++) {
          if (
            board[y][x].type === 'floor' &&
            !(x === 1 && y === 1) && // Not starting position
            isAccessible({ x: 1, y: 1 }, { x, y }, board)
          ) {
            position = { x, y };
            console.log(`Fallback venue position found at (${x}, ${y})`);
            break;
          }
        }
        if (position) break;
      }
    }

    console.log('Setting new venue:', randomVenue, 'at position:', position);

    if (position) {
      setLastVenueName(randomVenue);
      setCurrentVenue({ name: randomVenue, position });
    } else {
      console.error('Could not generate valid venue position even with fallback');
    }
  }, [board, lastVenueName]);

  useEffect(() => {
    if (board && board.length > 0 && !currentVenue) {
      console.log('Initial venue setup triggered');
      setNewVenue();
    }
  }, [board, setNewVenue, currentVenue]);

  return { currentVenue, setNewVenue };
};
