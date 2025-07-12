// src/components/GameBoard.js

import React, { useState, useEffect, useCallback } from 'react';
import './GTVenue/Gameboard.css';
import './GTVenue/Notification.css';
import Notification from './GTVenue/Notification';
import { generateBoard } from './GTVenue/gameUtils';
import { useObstacles } from '../shared/hooks/useObstacles';
import { useVenue } from '../shared/hooks/useVenue';

const GameBoard = () => {
  // State variables
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [venuesReached, setVenuesReached] = useState(0);
  const [notification, setNotification] = useState(null);
  const [notificationPosition, setNotificationPosition] = useState('left');
  const [obstacleIntervalDuration, setObstacleIntervalDuration] = useState(1000);
  const [roundNumber, setRoundNumber] = useState(1);
  const [highScores, setHighScores] = useState([]);
  const [showHighScores, setShowHighScores] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Constants
  const MIN_INTERVAL_DURATION = 300;
  const INTERVAL_DECREMENT = 10;
  const ROUND_SPEED_MULTIPLIER = 0.9; // Each round starts 10% faster (more gradual)

  // Custom hooks
  const { obstacles } = useObstacles(board, playerPos, obstacleIntervalDuration);
  const { currentVenue, setNewVenue } = useVenue(board, playerPos);

  // Initialize board and load high scores
  useEffect(() => {
    console.log('Initializing game board...');
    const newBoard = generateBoard();
    console.log('Generated board:', newBoard);
    setBoard(newBoard);
    fetchHighScores(); // Load high scores from API
  }, []);

  // Close notification
  const onCloseNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // Set notification with alternating position
  const setNotificationWithPosition = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    setNotificationPosition(prev => prev === 'left' ? 'right' : 'left');
  }, []);

  // Reset game function
  const resetGame = useCallback((message, type = 'success') => {
    console.log('Resetting game with message:', message);
    const newBoard = generateBoard();
    setBoard(newBoard);
    setPlayerPos({ x: 1, y: 1 });
    setHealth(100);
    setVenuesReached(0);
    setScore(0);
    setRoundNumber(1);
    setObstacleIntervalDuration(1000);
    setNotificationWithPosition(message, type);
    setShowHighScores(false);
    setPlayerName('');
    setSubmitted(false);
  }, [setNotificationWithPosition]);

  // API endpoints
  const API_BASE_URL = 'https://wok5wtifbi.execute-api.us-east-2.amazonaws.com/foReal';
  
  // Fetch high scores from API
  const fetchHighScores = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/getHighScores`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setHighScores(data);
      console.log('Fetched high scores:', data);
    } catch (err) {
      console.error('Error fetching high scores:', err);
      setError('Failed to load high scores. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit high score to API
  const submitHighScore = async (name, playerScore) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Validate input
      if (!name || name.trim().length === 0) {
        throw new Error('Player name is required');
      }
      if (typeof playerScore !== 'number' || playerScore < 0) {
        throw new Error('Invalid score');
      }
      
      const response = await fetch(`${API_BASE_URL}/submitHighScores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player_name: name.trim(),
          score: playerScore
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Score submitted successfully:', result);
      
      // Refresh high scores after submission
      await fetchHighScores();
      return true;
    } catch (err) {
      console.error('Error submitting high score:', err);
      setError(`Failed to submit score: ${err.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if current score is a high score
  const isHighScore =
    highScores.length < 10 || score > highScores[highScores.length - 1]?.score;

  // Render health as hearts
  const renderHearts = () => {
    const fullHearts = Math.floor(health / 10);
    const hasPartialHeart = health % 10 > 0;
    const emptyHearts = 10 - fullHearts - (hasPartialHeart ? 1 : 0);
    
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[...Array(fullHearts)].map((_, i) => (
          <span key={`full-${i}`}>❤️</span>
        ))}
        {hasPartialHeart && <span>💔</span>}
        {[...Array(emptyHearts)].map((_, i) => (
          <span key={`empty-${i}`}>🖤</span>
        ))}
      </div>
    );
  };

  // Handle name submission for high scores
  const handleNameSubmit = useCallback(async () => {
    if (playerName.trim() === '') {
      alert('Please enter your name.');
      return;
    }
    
    const success = await submitHighScore(playerName, score);
    if (success) {
      setSubmitted(true);
      setShowHighScores(true); // Automatically show high score board after successful submission
    }
  }, [playerName, score]);

  // Move player function
  const movePlayer = useCallback(
    (dx, dy) => {
      const newX = playerPos.x + dx;
      const newY = playerPos.y + dy;

      console.log('Attempting to move player:', { dx, dy, newX, newY, currentPos: playerPos });

      if (!board[newY] || !board[newY][newX]) {
        console.log('Invalid move - out of bounds');
        return;
      }

      const hitObstacle = obstacles.find(
        (obs) => obs.position.x === newX && obs.position.y === newY
      );

      if (hitObstacle) {
        setHealth((prev) => Math.max(0, prev - 20));
        setNotificationWithPosition(
          `You ran into ${
            hitObstacle.type === 'delivery' ? 'a delivery person' : 'a raving fan'
          } and lost 20 health!`,
          'error'
        );
        return;
      }

      if (board[newY][newX].type !== 'wall') {
        console.log('Moving to position:', { x: newX, y: newY }, 'Tile type:', board[newY][newX].type);
        console.log('Current venue:', currentVenue);
        
        setPlayerPos({ x: newX, y: newY });

        // Check if we reached the venue (regardless of tile type, as venue might be placed on wall due to timing)
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
            const newRoundNumber = roundNumber + 1;
            const newRoundSpeed = Math.max(MIN_INTERVAL_DURATION, 1000 * Math.pow(ROUND_SPEED_MULTIPLIER, newRoundNumber - 1));
            
            setNotificationWithPosition(
              `Banana Bread! You've reached all 5 venues! Starting round ${newRoundNumber}...`,
              'success'
            );
            // Reset for new round but keep score and increase speed
            setVenuesReached(0);
            setHealth(100);
            setRoundNumber(newRoundNumber);
            setObstacleIntervalDuration(newRoundSpeed);
            // Generate new board and reset player position
            const newBoard = generateBoard();
            setBoard(newBoard);
            setPlayerPos({ x: 1, y: 1 });
            setNewVenue();
          } else {
            setNotificationWithPosition(
              `You made it to ${currentVenue.name}! +50 points (${newVenuesReached}/5)`,
              'success'
            );
            setNewVenue();
          }
        }
      } else {
        console.log('Wall collision at position:', { x: newX, y: newY }, 'Tile type:', board[newY][newX].type);
        console.log('Current venue:', currentVenue);
        setHealth((prev) => Math.max(0, prev - 10));
        setNotificationWithPosition(
          'You hit a wall and lost 10 health!',
          'error'
        );
      }
    },
    [
      playerPos,
      board,
      obstacles,
      currentVenue,
      venuesReached,
      roundNumber,
      setNewVenue,
      setObstacleIntervalDuration,
      setNotificationWithPosition,
    ]
  );

  // Key press event listener
  useEffect(() => {
    // Don't add event listener if game is over
    if (health <= 0) {
      return;
    }

    const handleKeyPress = (e) => {
      console.log('Key pressed:', e.key);
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
  }, [movePlayer, health]);

  // Victory Screen - Removed since game continues indefinitely

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
            position={notificationPosition}
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
            {isLoading ? (
              <p>Loading high scores...</p>
            ) : error ? (
              <div>
                <p style={{ color: 'red' }}>{error}</p>
                <button onClick={fetchHighScores}>Retry</button>
              </div>
            ) : (
              <ol>
                {highScores.map((entry, index) => (
                  <li key={entry.score_id || index}>
                    {entry.player_name}: {entry.score}
                    {entry.timestamp && (
                      <span style={{ fontSize: '0.8em', color: '#ccc', marginLeft: '10px' }}>
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            )}
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
          position={notificationPosition}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
        <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
          Score: {score}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
        <div style={{ color: 'white' }}>
          Health: {renderHearts()}
        </div>
        <div style={{ color: 'white', fontSize: '16px' }}>
          {venuesReached}/5
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
        {currentVenue && (
          <div style={{ color: 'white' }}>
            Get to: <strong>{currentVenue.name}</strong>
          </div>
        )}
        {!currentVenue && (
          <div style={{ color: 'yellow' }}>
            Loading venue...
          </div>
        )}
      </div>
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
      {/* Mobile Controls - Only show when game is active */}
      {health > 0 && (
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
      )}
      {health > 0 && (
        <div className="instructions">
          Use arrow keys, WASD, or the buttons above to move
        </div>
      )}
    </div>
  );
};

export default GameBoard;
