import React, { useEffect, useState, useCallback } from 'react';
import './WanderingSpuddie.css'; // Import your character CSS file
import spudFront from '../img/SpudFront.png';
import spudBack from '../img/SpudBack.png';
import spudRight from '../img/SpudRight.png';
import spudLeft from '../img/SpudLeft.png';
import Chatbox from '../ui/Chatbox';
import { useLocation } from 'react-router-dom';

const MOVEMENT_CONFIG = {
  MIN_INTERVAL: 3000,
  MAX_INTERVAL: 9000,
  MIN_DISTANCE: 50,
  MAX_DISTANCE: 100,
  BUFFER: 40,
  SPUD_SIZE: "15vw", // Increased base size for mobile
  SPUD_SIZE_CHAT: "25vw", // Adjusted chat size for mobile
  DIRECTIONS: ['up', 'down', 'left', 'right'],
  CHAT_OFFSET_TOP: 250,
  CHAT_OFFSET_LEFT: 150,
};

const COLLISION_CONFIG = {
  AVOID_TAGS: ['button', 'a', 'input', 'select', 'textarea'],
  AVOID_CLASSES: ['nav-link', 'clickable', 'song-symbol-container'],
  BUFFER: 60,
  CHECK_INTERVAL: 100
};

const SPUD_IMAGES = {
  up: { src: spudBack, alt: "Assistant Spud Back" },
  down: { src: spudFront, alt: "Assistant Spud Front" },
  left: { src: spudLeft, alt: "Assistant Spud Left" },
  right: { src: spudRight, alt: "Assistant Spud Right" }
};

const SPUD_MOODS = {
  HAPPY: { bounceHeight: 10, moveSpeed: 1.2, emote: '😊' },
  SLEEPY: { bounceHeight: 5, moveSpeed: 0.8, emote: '😴' },
  EXCITED: { bounceHeight: 15, moveSpeed: 1.5, emote: '🎉' },
  CURIOUS: { bounceHeight: 12, moveSpeed: 1.3, emote: '🤔' },
  PLAYFUL: { bounceHeight: 13, moveSpeed: 1.4, emote: '😄' }
};

const ANIMATIONS = {
  dance: {
    keyframes: [
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(360deg)' }
    ],
    options: {
      duration: 1000,
      iterations: 3
    }
  },
  bounce: {
    keyframes: [
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-10px)' },
      { transform: 'translateY(0px)' }
    ],
    options: {
      duration: 1000,
      iterations: Infinity,
      easing: 'ease-in-out'
    }
  },
  wiggle: {
    keyframes: [
      { transform: 'rotate(-5deg)' },
      { transform: 'rotate(5deg)' },
      { transform: 'rotate(-5deg)' }
    ],
    options: {
      duration: 1000,
      iterations: Infinity,
      easing: 'ease-in-out'
    }
  }
};

function WanderingSpuddie() {
  const location = useLocation();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [lastPosition, setLastPosition] = useState({ top: 0, left: 0 });
  const [direction, setDirection] = useState('down');
  const [showChatbox, setShowChatbox] = useState(false);
  const [isMoving, setIsMoving] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mood, setMood] = useState('HAPPY');
  const [interactions, setInteractions] = useState(() => {
    const saved = localStorage.getItem('spuddie-interactions');
    return saved ? JSON.parse(saved) : {
      visits: 0,
      lastVisit: null,
      favoriteTopics: {},
      chatHistory: []
    };
  });
  const [secretsFound, setSecretsFound] = useState(new Set());
  const [specialAnimation, setSpecialAnimation] = useState(null);
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('spuddie-achievements');
    return saved ? JSON.parse(saved) : new Set();
  });
  const [currentEmote, setCurrentEmote] = useState(null);

  const getRandomMovement = useCallback(() => {
    const direction = MOVEMENT_CONFIG.DIRECTIONS[Math.floor(Math.random() * MOVEMENT_CONFIG.DIRECTIONS.length)];
    const interval = Math.floor(Math.random() * (MOVEMENT_CONFIG.MAX_INTERVAL - MOVEMENT_CONFIG.MIN_INTERVAL) + MOVEMENT_CONFIG.MIN_INTERVAL);
    const distance = Math.floor(Math.random() * (MOVEMENT_CONFIG.MAX_DISTANCE - MOVEMENT_CONFIG.MIN_DISTANCE) + MOVEMENT_CONFIG.MIN_DISTANCE);
    return { direction, interval, distance };
  }, []);

  const clamp = useCallback((value, min, max) => {
    return Math.min(Math.max(value, min + MOVEMENT_CONFIG.BUFFER), max - MOVEMENT_CONFIG.BUFFER);
  }, []);

  const checkCollision = useCallback((newPos) => {
    const spudSize = parseInt(MOVEMENT_CONFIG.SPUD_SIZE) || 100;
    const buffer = COLLISION_CONFIG.BUFFER;
    const scrollY = window.scrollY;

    // Create a temporary element to check position
    const temp = document.createElement('div');
    temp.style.position = 'absolute';
    temp.style.top = `${newPos.top}px`; // Position relative to document
    temp.style.left = `${newPos.left}px`;
    temp.style.width = `${spudSize}px`;
    temp.style.height = `${spudSize}px`;
    temp.style.pointerEvents = 'none';
    document.body.appendChild(temp);

    // Get elements to avoid
    const elementsToAvoid = [
      ...document.querySelectorAll(COLLISION_CONFIG.AVOID_TAGS.join(',')),
      ...document.querySelectorAll(COLLISION_CONFIG.AVOID_CLASSES.map(c => `.${c}`).join(','))
    ];

    // Check for collisions
    const spudRect = {
      top: newPos.top,
      bottom: newPos.top + spudSize,
      left: newPos.left,
      right: newPos.left + spudSize
    };
    
    document.body.removeChild(temp);

    for (const element of elementsToAvoid) {
      const elementRect = element.getBoundingClientRect();
      
      // Convert elementRect to absolute positions
      const absoluteRect = {
        top: elementRect.top + scrollY,
        bottom: elementRect.bottom + scrollY,
        left: elementRect.left,
        right: elementRect.right
      };

      // Add buffer around elements
      const bufferedRect = {
        left: absoluteRect.left - buffer,
        right: absoluteRect.right + buffer,
        top: absoluteRect.top - buffer,
        bottom: absoluteRect.bottom + buffer
      };

      // Check if spud would overlap with the buffered element
      if (!(spudRect.right < bufferedRect.left || 
            spudRect.left > bufferedRect.right || 
            spudRect.bottom < bufferedRect.top || 
            spudRect.top > bufferedRect.bottom)) {
        return true; // Collision detected
      }
    }

    return false; // No collision
  }, []);

  const moveCharacter = useCallback(() => {
    if (!isMoving) return;

    const { direction, distance } = getRandomMovement();
    setDirection(direction);

    setPosition(prevPosition => {
      const movementMap = {
        up: { top: prevPosition.top - distance, left: prevPosition.left },
        down: { top: prevPosition.top + distance, left: prevPosition.left },
        left: { top: prevPosition.top, left: prevPosition.left - distance },
        right: { top: prevPosition.top, left: prevPosition.left + distance }
      };

      const newPosition = movementMap[direction];
      const clampedPosition = {
        top: clamp(newPosition.top, 0, window.innerHeight),
        left: clamp(newPosition.left, 0, window.innerWidth)
      };

      // If collision detected, try a different direction or stay in place
      if (checkCollision(clampedPosition)) {
        return prevPosition;
      }

      return clampedPosition;
    });
  }, [clamp, getRandomMovement, isMoving, checkCollision]);

  const moveToCenter = () => {
    setLastPosition(position);
    const centerPosition = {
      top: isMobile ? (window.innerHeight / 2) - 100 : (window.innerHeight / 2),
      left: window.innerWidth / 2,
    };
    setPosition(centerPosition);
  };

  const returnToLastPosition = () => {
    setPosition(lastPosition);
  };

  const toggleChatbox = () => {
    if (!showChatbox) {
      setIsMoving(false);
      moveToCenter();
    } else {
      returnToLastPosition();
      setIsMoving(true);
    }
    setShowChatbox(!showChatbox);
  };

  useEffect(() => {
    const { interval } = getRandomMovement();
    const intervalId = setInterval(moveCharacter, interval);
    return () => clearInterval(intervalId);
  }, [moveCharacter, getRandomMovement]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const updateInteractions = () => {
      setInteractions(prev => ({
        ...prev,
        visits: prev.visits + 1,
        lastVisit: new Date().toISOString()
      }));
    };
    updateInteractions();
  }, []);

  useEffect(() => {
    if (!isMoving || showChatbox) return;
    
    const element = document.querySelector('.spuddie-image-container');
    if (!element) return;

    // Random idle animations
    const idleInterval = setInterval(() => {
      const random = Math.random();
      if (random < 0.3) {
        element.animate(ANIMATIONS.bounce.keyframes, ANIMATIONS.bounce.options);
        setCurrentEmote(SPUD_MOODS[mood].emote);
        setTimeout(() => setCurrentEmote(null), 2000);
      } else if (random < 0.5) {
        element.animate(ANIMATIONS.wiggle.keyframes, ANIMATIONS.wiggle.options);
      }
    }, 5000);

    return () => clearInterval(idleInterval);
  }, [isMoving, showChatbox, mood]);

  useEffect(() => {
    const startPosition = {
      top: MOVEMENT_CONFIG.BUFFER,
      left: MOVEMENT_CONFIG.BUFFER
    };
    
    setPosition(startPosition);
    setDirection('down');
    setShowChatbox(false);
    setIsMoving(true);
  }, [location.pathname]);

  const isMobile = windowWidth <= 768;

  const spudStyle = {
    width: showChatbox ? MOVEMENT_CONFIG.SPUD_SIZE_CHAT : MOVEMENT_CONFIG.SPUD_SIZE,
    height: showChatbox ? MOVEMENT_CONFIG.SPUD_SIZE_CHAT : MOVEMENT_CONFIG.SPUD_SIZE,
    transition: "all 0.5s ease-in-out",
    maxWidth: isMobile ? "150px" : "200px", // Limit maximum size on mobile
    maxHeight: isMobile ? "150px" : "200px",
  };

  const containerStyle = {
    position: 'absolute',
    top: position.top + window.scrollY,
    left: position.left,
    transition: "all 0.5s ease-in-out",
    zIndex: showChatbox ? 1000 : 1,
    display: showChatbox ? 'flex' : 'block',
    alignItems: 'center',
    gap: isMobile ? '20px' : '40px',
    justifyContent: 'center',
    width: showChatbox ? (isMobile ? '95vw' : '800px') : 'auto',
    flexDirection: isMobile ? 'column' : 'row',
    transform: showChatbox ? 'translate(-50%, -50%)' : 'none',
  };

  const chatboxStyle = {
    transition: "all 0.5s ease-in-out",
    transform: 'scale(1.2)',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
    width: isMobile ? '90vw' : '400px',
    maxWidth: isMobile ? '90vw' : '400px',
  };

  const followMouse = (e) => {
    if (!isMoving || showChatbox) return;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const distance = Math.sqrt(
      Math.pow(mouseX - position.left, 2) + 
      Math.pow(mouseY - position.top, 2)
    );
    
    // Change mood and direction based on mouse proximity
    if (distance < 100) {
      setMood('EXCITED');
    } else if (distance < 200) {
      setMood('CURIOUS');
    } else {
      setMood('HAPPY');
    }

    // Follow mouse with collision detection
    if (distance < 300) {
      const speed = 0.05 * (SPUD_MOODS[mood].moveSpeed);
      const newPosition = {
        left: position.left + (mouseX - position.left) * speed,
        top: position.top + (mouseY - position.top) * speed
      };

      // Only update position if no collision
      if (!checkCollision(newPosition)) {
        setPosition(newPosition);
      }

      // Update direction based on movement
      const angle = Math.atan2(mouseY - position.top, mouseX - position.left);
      const directions = {
        right: angle > -Math.PI/4 && angle < Math.PI/4,
        down: angle >= Math.PI/4 && angle < 3*Math.PI/4,
        left: (angle >= 3*Math.PI/4 || angle < -3*Math.PI/4),
        up: angle >= -3*Math.PI/4 && angle < -Math.PI/4
      };
      setDirection(Object.entries(directions).find(([_, value]) => value)[0]);
    }
  };

  const unlockAchievement = (achievementId) => {
    setAchievements(prev => {
      const newAchievements = new Set(prev);
      newAchievements.add(achievementId);
      localStorage.setItem('spuddie-achievements', JSON.stringify([...newAchievements]));
      return newAchievements;
    });
  };

  const checkSecrets = (message) => {
    const secrets = {
      'hello spuddie': () => setMood('HAPPY'),
      'dance': () => {
        setSpecialAnimation('dance');
        const element = document.querySelector('.spuddie-image-container');
        if (element) {
          element.animate(ANIMATIONS.dance.keyframes, ANIMATIONS.dance.options);
        }
      },
      'secret': () => unlockAchievement('found-secret')
    };
    
    Object.entries(secrets).forEach(([trigger, action]) => {
      if (message.toLowerCase().includes(trigger)) {
        action();
        setSecretsFound(prev => new Set([...prev, trigger]));
      }
    });
  };

  return (
    <div className="wandering-spuddie-container">
      <div 
        className={`character ${showChatbox ? 'chatting' : ''}`} 
        style={containerStyle} 
        onClick={!showChatbox ? toggleChatbox : undefined}
      >
        <div 
          className="spuddie-image-container"
          onClick={showChatbox ? undefined : toggleChatbox}
          style={{
            cursor: 'pointer',
            width: 'fit-content',
            position: 'relative'
          }}
        >
          <img 
            src={SPUD_IMAGES[direction].src} 
            style={spudStyle} 
            alt={SPUD_IMAGES[direction].alt} 
          />
          {currentEmote && (
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '24px',
              animation: 'float 1s ease-in-out infinite'
            }}>
              {currentEmote}
            </div>
          )}
        </div>
        {showChatbox && (
          <div className="chatbox-container">
            <Chatbox 
              onClose={toggleChatbox}
              style={chatboxStyle}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default WanderingSpuddie;