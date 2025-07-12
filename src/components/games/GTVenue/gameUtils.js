// src/components/gameUtils.js

import { BOARD_SIZE, WALL_CHANCE} from './constants';
import { isAccessible } from './pathfinding';
//import { Tile } from './types';

export const generateBoard = () => {
  let attempts = 0;
  let newBoard;

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
  } while (
    !isAccessible(
      { x: 1, y: 1 },
      { x: BOARD_SIZE - 2, y: BOARD_SIZE - 2 },
      newBoard
    ) &&
    attempts < 10
  );

  return newBoard;
};

export const generateRandomPosition = (gameBoard, playerPos) => {
  if (!gameBoard || !gameBoard.length || !gameBoard[0]) {
    console.error('Invalid game board');
    return null;
  }

  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    const x = Math.floor(Math.random() * (BOARD_SIZE - 2)) + 1;
    const y = Math.floor(Math.random() * (BOARD_SIZE - 2)) + 1;

    if (
      gameBoard[y] &&
      gameBoard[y][x] &&
      gameBoard[y][x].type === 'floor' &&
      !(x === playerPos.x && y === playerPos.y) &&
      isAccessible(playerPos, { x, y }, gameBoard)
    ) {
      return { x, y };
    }
    attempts++;
  }

  console.warn('Could not find valid position after maximum attempts');
  return null;
};
