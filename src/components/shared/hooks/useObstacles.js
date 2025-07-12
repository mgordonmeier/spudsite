import { useState, useEffect, useRef, useCallback } from 'react';
import { generateRandomPosition } from '../../games/GTVenue/gameUtils';
import { CRAZY_EMOJIS } from '../../games/GTVenue/constants';
import { findShortestPath } from '../../games/GTVenue/pathfinding';

const getRandomCrazyEmoji = () => {
  return CRAZY_EMOJIS[Math.floor(Math.random() * CRAZY_EMOJIS.length)];
};

export const useObstacles = (board, playerPos, obstacleIntervalDuration) => {
  const [obstacles, setObstacles] = useState([]);

  // Refs to store the latest playerPos and board
  const playerPosRef = useRef(playerPos);
  const boardRef = useRef(board);

  // Update refs when playerPos or board change
  useEffect(() => {
    playerPosRef.current = playerPos;
  }, [playerPos]);

  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  // isValidMove function using refs
  const isValidMove = (x, y) => {
    const board = boardRef.current;
    const playerPos = playerPosRef.current;
    return (
      x > 0 &&
      x < board[0].length - 1 &&
      y > 0 &&
      y < board.length - 1 &&
      board[y][x].type === 'floor' &&
      !(x === playerPos.x && y === playerPos.y)
    );
  };

  // moveObstacles function using refs and useCallback
  const moveObstacles = useCallback(() => {
    const board = boardRef.current;
    const playerPos = playerPosRef.current;
    if (!board || board.length === 0) return;

    setObstacles((currentObstacles) =>
      currentObstacles.map((obstacle) => {
        // Fan logic with pathfinding
        if (obstacle.type === 'fan') {
          const path = findShortestPath(
            obstacle.position,
            playerPos,
            board,
            currentObstacles
          );

          if (path && path.length > 0) {
            const nextStep = path[0];
            // Ensure the move is valid
            if (isValidMove(nextStep.x, nextStep.y)) {
              return {
                ...obstacle,
                position: { x: nextStep.x, y: nextStep.y },
              };
            }
          }
        }

        // Delivery logic remains the same
        if (obstacle.type === 'delivery') {
          const possibleMoves = [
            { x: obstacle.position.x + 1, y: obstacle.position.y },
            { x: obstacle.position.x - 1, y: obstacle.position.y },
            { x: obstacle.position.x, y: obstacle.position.y + 1 },
            { x: obstacle.position.x, y: obstacle.position.y - 1 },
          ].filter((pos) => isValidMove(pos.x, pos.y));

          if (possibleMoves.length > 0) {
            const randomMove =
              possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            return {
              ...obstacle,
              position: randomMove,
            };
          }
        }

        return obstacle;
      })
    );
  }, []); // Empty dependency array ensures it's stable

  // Move obstacles every obstacleIntervalDuration milliseconds
  useEffect(() => {
    const obstacleInterval = setInterval(() => {
      moveObstacles();
    }, obstacleIntervalDuration);

    return () => clearInterval(obstacleInterval);
  }, [moveObstacles, obstacleIntervalDuration]); // Include obstacleIntervalDuration

  // Initialize obstacles when the board is ready
  useEffect(() => {
    if (board && board.length > 0) {
      console.log('Initializing obstacles...');
      const pos1 = generateRandomPosition(board, { x: 1, y: 1 }); // Use starting position
      const pos2 = generateRandomPosition(board, { x: 1, y: 1 }); // Use starting position

      if (pos1 && pos2) {
        setObstacles([
          {
            type: 'delivery',
            position: pos1,
            direction: { x: 1, y: 0 },
          },
          {
            type: 'fan',
            position: pos2,
            direction: { x: 0, y: 1 },
            emoji: getRandomCrazyEmoji(),
          },
        ]);
        console.log('Obstacles set at positions:', pos1, pos2);
      }
    }
  }, [board]); // Remove playerPos dependency

  return { obstacles };
};
