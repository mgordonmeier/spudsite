// src/components/GameBoard.js

import React, { useEffect, useState, useCallback } from 'react';
import './GTVenue/Gameboard.css';
import Notification from './GTVenue/Notification';
import { generateBoard } from './GTVenue/gameUtils';
import { useObstacles } from './hooks/useObstacles';
import { useVenue } from './hooks/useVenue';

const GameBoard = () => {
  // State variables
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [venuesReached, setVenuesReached] = useState(0);
  const [notification, setNotification] = useState(null);
  const [obstacleIntervalDuration, setObstacleIntervalDuration] = useState(1000);
  const [highScores, setHighScores] = useState([]);
  const [showHighScores, setShowHighScores] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Constants
  const MIN_INTERVAL_DURATION = 300;
  const INTERVAL_DECREMENT = 10;

  // Custom hooks
  const { obstacles } = useObstacles(board, playerPos, obstacleIntervalDuration);
  const { currentVenue, setNewVenue } = useVenue(board, playerPos);

  // Initialize board and load high scores
  useEffect(() => {
    const newBoard = generateBoard();
    setBoard(newBoard);
    const storedHighScores = JSON.parse(localStorage.getItem('highScores')) || [];
    setHighScores(storedHighScores);
  }, []);

  // Reset game function
  const resetGame = useCallback((message, type = 'success') => {
    const newBoard = generateBoard();
    setBoard(newBoard);
    setPlayerPos({ x: 1, y: 1 });
    setHealth(100);
    setVenuesReached(0);
    setScore(0);
    setObstacleIntervalDuration(1000);
    setNotification({ message, type });
    setShowHighScores(false);
    setPlayerName('');
    setSubmitted(false);
    setGameWon(false);
  }, []);

  // Close notification
  const onCloseNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // Check if current score is a high score
  const isHighScore =
    highScores.length < 10 || score > highScores[highScores.length - 1]?.score;

  // Handle name submission for high scores
  const handleNameSubmit = useCallback(() => {
    if (playerName.trim() === '') {
      alert('Please enter your name.');
      return;
    }
    const newHighScores = [...highScores, { name: playerName, score }];
    newHighScores.sort((a, b) => b.score - a.score);
    if (newHighScores.length > 10) {
      newHighScores.pop();
    }
    setHighScores(newHighScores);
    localStorage.setItem('highScores', JSON.stringify(newHighScores));
    setSubmitted(true);
  }, [playerName, score, highScores]);

  // Move player function
  const movePlayer = useCallback(
    (dx, dy) => {
      const newX = playerPos.x + dx;
      const newY = playerPos.y + dy;

      if (!board[newY] || !board[newY][newX]) {
        return;
      }

      const hitObstacle = obstacles.find(
        (obs) => obs.position.x === newX && obs.position.y === newY
      );

      if (hitObstacle) {
        setHealth((prev) => Math.max(0, prev - 20));
        setNotification({
          message: `You ran into ${
            hitObstacle.type === 'delivery' ? 'a delivery person' : 'a raving fan'
          } and lost 20 health!`,
          type: 'error',
        });
        return;
      }

      if (board[newY][newX].type !== 'wall') {
        setPlayerPos({ x: newX, y: newY });

        if (
          currentVenue &&
          newX === currentVenue.position.x &&
          newY === currentVenue.position.y
        ) {
          const newVenuesReached = venuesReached + 1;
          setVenuesReached(newVenuesReached);
          setScore((prev) => prev + 50);

          // Decrease the obstacle interval duration upon reaching a venue
          setObstacleIntervalDuration((prevDuration) =>
            Math.max(MIN_INTERVAL_DURATION, prevDuration - INTERVAL_DECREMENT)
          );

          if (newVenuesReached >= 5) {
            setNotification({
              message:
                "Banana Bread! You've reached all 5 venues! Get some sleep so we can do it again tomorrow!",
              type: 'success',
            });
            setGameWon(true);
          } else {
            setNotification({
              message: `You made it to ${currentVenue.name}! +50 points (${newVenuesReached}/5)`,
              type: 'success',
            });
            setNewVenue();
          }
        }
      } else {
        setHealth((prev) => Math.max(0, prev - 10));
        setNotification({
          message: 'You hit a wall and lost 10 health!',
          type: 'error',
        });
      }
    },
    [
      playerPos,
      board,
      obstacles,
      currentVenue,
      venuesReached,
      setNewVenue,
      setObstacleIntervalDuration,
      resetGame,
    ]
  );

  // Key press event listener
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          movePlayer(0, -1);
          break;
        case 'ArrowDown':
        case 's':
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
          movePlayer(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
          movePlayer(1, 0);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer]);

  // Victory Screen
  if (gameWon) {
    return (
      <div className="game-container game-over-screen">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={onCloseNotification}
            duration={3000}
          />
        )}
        <h2 className="game-over-title">You Win!</h2>
        <h1 className="final-score">Score: {score}</h1>
        {isHighScore && !submitted ? (
          <div className="high-score-entry">
            <p>Congratulations! You made it to the top 10 high scores.</p>
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <button onClick={handleNameSubmit}>Submit</button>
          </div>
        ) : submitted ? (
          <div className="high-score-confirmation">
            <p>Thank you, {playerName}! Your score has been saved.</p>
          </div>
        ) : null}
        <button onClick={() => setShowHighScores(true)} className="view-high-scores-button">
          View High Scores
        </button>
        <button onClick={() => resetGame('Starting a new game...')} className="play-again-button">
          Play Again
        </button>
        {showHighScores && (
          <div className="high-score-board">
            <h2>High Scores</h2>
            <ol>
              {highScores.map((entry, index) => (
                <li key={index}>
                  {entry.name}: {entry.score}
                </li>
              ))}
            </ol>
            <button onClick={() => setShowHighScores(false)}>Close</button>
          </div>
        )}
      </div>
    );
  }

  // Game Over Screen
  if (health <= 0) {
    return (
      <div className="game-container game-over-screen">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={onCloseNotification}
            duration={3000}
          />
        )}
        <h2 className="game-over-title">Game Over!</h2>
        <h1 className="final-score">Score: {score}</h1>
        {isHighScore && !submitted ? (
          <div className="high-score-entry">
            <p>Congratulations! You made it to the top 10 high scores.</p>
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <button onClick={handleNameSubmit}>Submit</button>
          </div>
        ) : submitted ? (
          <div className="high-score-confirmation">
            <p>Thank you, {playerName}! Your score has been saved.</p>
          </div>
        ) : null}
        <button onClick={() => setShowHighScores(true)} className="view-high-scores-button">
          View High Scores
        </button>
        <button onClick={() => resetGame('Starting a new game...')} className="play-again-button">
          Play Again
        </button>
        {showHighScores && (
          <div className="high-score-board">
            <h2>High Scores</h2>
            <ol>
              {highScores.map((entry, index) => (
                <li key={index}>
                  {entry.name}: {entry.score}
                </li>
              ))}
            </ol>
            <button onClick={() => setShowHighScores(false)}>Close</button>
          </div>
        )}
      </div>
    );
  }

  // Main Game Render
  return (
    <div className="game-container">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={onCloseNotification}
          duration={2130}
        />
      )}
      <div className="game-stats">
        <div>Score: {score}</div>
        <div>Health: {health}</div>
      </div>
      {currentVenue && (
        <div className="mb-4" style={{ color: 'white' }}>
          Target Venue: {currentVenue.name}
        </div>
      )}
      <div className="game-grid">
        {board.map((row, y) =>
          row.map((tile, x) => {
            const obstacle = obstacles.find(
              (o) => o.position.x === x && o.position.y === y
            );
            return (
              <div
                key={`${x}-${y}`}
                className={`game-tile
                  ${tile.type === 'wall' ? 'wall' : 'floor'}
                  ${playerPos.x === x && playerPos.y === y ? 'player' : ''}
                  ${
                    currentVenue &&
                    currentVenue.position.x === x &&
                    currentVenue.position.y === y
                      ? 'target-venue'
                      : ''
                  }
                `}
              >
                {playerPos.x === x && playerPos.y === y && '🥔'}
                {obstacle && (obstacle.type === 'delivery' ? '🚗' : obstacle.emoji)}
              </div>
            );
          })
        )}
      </div>
      {/* Mobile Controls */}
      <div className="mobile-controls">
        <div></div>
        <button onClick={() => movePlayer(0, -1)} className="control-button">
          ⬆️
        </button>
        <div></div>
        <button onClick={() => movePlayer(-1, 0)} className="control-button">
          ⬅️
        </button>
        <div className="control-button" style={{ backgroundColor: 'transparent', border: 'none' }}></div>
        <button onClick={() => movePlayer(1, 0)} className="control-button">
          ➡️
        </button>
        <div></div>
        <button onClick={() => movePlayer(0, 1)} className="control-button">
          ⬇️
        </button>
        <div></div>
      </div>
      <div className="instructions">
        Use arrow keys, WASD, or the buttons above to move
      </div>
    </div>
  );
};

export default GameBoard;
