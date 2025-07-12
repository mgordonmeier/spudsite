// src/components/pathfinding.js
import { BOARD_SIZE } from './constants';

export const isAccessible = (start, end, gameBoard) => {
    if (
      !gameBoard ||
      !gameBoard[start.y] ||
      !gameBoard[start.y][start.x] ||
      !gameBoard[end.y] ||
      !gameBoard[end.y][end.x]
    ) {
      return false;
    }
  
    const queue = [start];
    const visited = new Set();
    const key = (p) => `${p.x},${p.y}`;
    visited.add(key(start));
  
    while (queue.length > 0) {
      const current = queue.shift();
      if (current.x === end.x && current.y === end.y) return true;
  
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      for (const [dx, dy] of directions) {
        const newX = current.x + dx;
        const newY = current.y + dy;
  
        if (
          newX >= 0 &&
          newX < BOARD_SIZE &&
          newY >= 0 &&
          newY < BOARD_SIZE &&
          gameBoard[newY] &&
          gameBoard[newY][newX] &&
          gameBoard[newY][newX].type === 'floor' &&
          !visited.has(`${newX},${newY}`)
        ) {
          queue.push({ x: newX, y: newY });
          visited.add(`${newX},${newY}`);
        }
      }
    }
    return false;
  };
  
  export const findShortestPath = (start, end, gameBoard, obstacles) => {
    const queue = [];
    const visited = new Set();
    const parent = new Map();
  
    const key = (p) => `${p.x},${p.y}`;
    const directions = [
      { x: 0, y: -1 }, // Up
      { x: 0, y: 1 },  // Down
      { x: -1, y: 0 }, // Left
      { x: 1, y: 0 },  // Right
    ];
  
    queue.push(start);
    visited.add(key(start));
  
    while (queue.length > 0) {
      const current = queue.shift();
  
      // If we've reached the end, reconstruct the path
      if (current.x === end.x && current.y === end.y) {
        const path = [];
        let tempKey = key(end);
  
        while (tempKey !== key(start)) {
          const [x, y] = tempKey.split(',').map(Number);
          path.unshift({ x, y });
          tempKey = parent.get(tempKey);
        }
        return path;
      }
  
      for (const dir of directions) {
        const newX = current.x + dir.x;
        const newY = current.y + dir.y;
        const newKey = `${newX},${newY}`;
  
        if (
          newX >= 0 &&
          newX < gameBoard[0].length &&
          newY >= 0 &&
          newY < gameBoard.length &&
          !visited.has(newKey) &&
          gameBoard[newY][newX].type === 'floor' &&
          !obstacles.some(
            (obs) => obs.position.x === newX && obs.position.y === newY
          )
        ) {
          queue.push({ x: newX, y: newY });
          visited.add(newKey);
          parent.set(newKey, key(current));
        }
      }
    }
  
    // If no path is found, return null
    return null;
  };


