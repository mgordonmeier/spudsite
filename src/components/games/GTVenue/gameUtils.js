// src/components/gameUtils.js

import { BOARD_SIZE, WALL_CHANCE} from './constants';
import { isAccessible } from './pathfinding';
//import { Tile } from './types';

export const generateBoard = () => {
  let attempts = 0;
  let newBoard;
  let accessibleFloorTiles;

  do {
    newBoard = Array(BOARD_SIZE)
      .fill(null)
      .map((_, y) =>
        Array(BOARD_SIZE)
          .fill(null)
          .map((_, x) => ({
            type:
              x === 0 || x === BOARD_SIZE - 1 || y === 0 || y === BOARD_SIZE - 1
                ? 'wall'
                : Math.random() < WALL_CHANCE
                ? 'wall'
                : 'floor',
            position: { x, y },
          }))
      );

    // Ensure starting position is floor
    if (newBoard) {
      newBoard[1][1] = { type: 'floor', position: { x: 1, y: 1 } };
    }
    attempts++;
    
    // Check if there are enough accessible floor tiles
    let accessibleFloorTiles = 0;
    for (let y = 1; y < BOARD_SIZE - 1; y++) {
      for (let x = 1; x < BOARD_SIZE - 1; x++) {
        if (
          newBoard[y][x].type === 'floor' &&
          isAccessible({ x: 1, y: 1 }, { x, y }, newBoard)
        ) {
          accessibleFloorTiles++;
        }
      }
    }
    
    console.log(`Board generation attempt ${attempts}:`, {
      isAccessible: isAccessible(
        { x: 1, y: 1 },
        { x: BOARD_SIZE - 2, y: BOARD_SIZE - 2 },
        newBoard
      ),
      accessibleFloorTiles
    });
  } while (
    (!isAccessible(
      { x: 1, y: 1 },
      { x: BOARD_SIZE - 2, y: BOARD_SIZE - 2 },
      newBoard
    ) ||
    accessibleFloorTiles < 10) && // Ensure at least 10 accessible floor tiles
    attempts < 10
  );

  console.log(`Board generated after ${attempts} attempts`);
  return newBoard;
};

export const generateRandomPosition = (gameBoard, playerPos) => {
  if (!gameBoard || !gameBoard.length || !gameBoard[0]) {
    console.error('Invalid game board');
    return null;
  }

  let attempts = 0;
  const maxAttempts = 200; // Increased attempts

  while (attempts < maxAttempts) {
    const x = Math.floor(Math.random() * (BOARD_SIZE - 2)) + 1;
    const y = Math.floor(Math.random() * (BOARD_SIZE - 2)) + 1;

    // Double-check that the position is valid
    if (
      gameBoard[y] &&
      gameBoard[y][x] &&
      gameBoard[y][x].type === 'floor' &&
      !(x === playerPos.x && y === playerPos.y) &&
      isAccessible(playerPos, { x, y }, gameBoard)
    ) {
      console.log(`Found valid position at (${x}, ${y}) after ${attempts + 1} attempts`);
      return { x, y };
    }
    attempts++;
  }

  console.error('Could not find valid position after maximum attempts');
  return null;
};
