import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './WanderingSpuddie.css';
import spudFront from '../../img/SpudFront.png';
import spudBack from '../../img/SpudBack.png';
import spudRight from '../../img/SpudRight.png';
import spudLeft from '../../img/SpudLeft.png';
import { SPUDDIE_EVENTS } from './spuddieEvents';
import {
  getDirection,
  getRandomBetween,
  getViewportSize,
  isElementVisibleInViewport,
  rectsOverlap,
  rectToDocumentRect
} from './spuddieGeometry';

const SPUD_IMAGES = {
  up: { src: spudBack, alt: 'Spuddie looking up' },
  down: { src: spudFront, alt: 'Spuddie looking forward' },
  left: { src: spudLeft, alt: 'Spuddie looking left' },
  right: { src: spudRight, alt: 'Spuddie looking right' },
};

const DESKTOP_MIN_WIDTH = 769;
const STORAGE_STATE = {
  WANDERING: 'wandering',
  INSPECTING: 'inspecting',
  RESTING: 'resting',
};

const MOVEMENT = {
  margin: 18,
  navClearance: 88,
  avoidBuffer: 18,
  importantBuffer: 34,
  minDelay: 1700,
  maxDelay: 3400,
  minStepDistance: 90,
  maxStepDistance: 230,
  maxInspectDistance: 320,
  portalChance: 0.035,
  inspectChance: 0.3,
};

const SONG_CARD_EDGE_GAP = 42;
const SONG_CARD_VERTICAL_PADDING = 24;
const SCROLL_IDLE_DELAY_MS = 180;
const EDGE_DOCK_TRANSITION_MS = 1200;
const SONG_CARD_APPROACH_TRANSITION_MS = 1600;
const SONG_CARD_CLOSE_STEP_DISTANCE = 82;
const SONG_SYMBOL_APPROACH_STEP_DISTANCE = 135;
const SONG_SYMBOL_ARRIVAL_DISTANCE = 72;
const SONG_SYMBOL_APPROACH_MIN_DURATION_MS = 1400;
const SONG_SYMBOL_APPROACH_MAX_DURATION_MS = 3600;
const SONG_SYMBOL_APPROACH_PIXELS_PER_SECOND = 42;
const SONG_SYMBOL_SETTLE_DURATION_MS = 650;
const PORTAL_EXIT_DURATION_MS = 950;
const PORTAL_ENTRY_DURATION_MS = 950;
const PORTAL_COOLDOWN_MS = 6500;
const PORTAL_EDGE_OVERFLOW = 28;
const INITIAL_ENTRY_DURATION_MS = 1200;
const MOVE_PATH_SAMPLE_DISTANCE = 34;
const MOVE_PATH_BUFFER = 14;
const ATTENTION_WIGGLE_CHANCE = 0.055;
const ATTENTION_WIGGLE_DURATION_MS = 1400;
const NOTICE_WIGGLE_DURATION_MS = 850;
const MIN_EFFECTIVE_MOVE_DISTANCE = 8;
const STUCK_STEP_LIMIT = 2;

const AVOID_SELECTOR = [
  'button',
  'a',
  'input',
  'select',
  'textarea',
  'iframe',
  '[role="button"]',
  '[role="dialog"]',
  '.site-nav-shell',
  '.song-card-modal',
  '.merch-modal-content',
  '.cart-modal-content',
  '.gallery-modal',
  '.gallery-image',
  '.member-card',
  '.home-logo-image',
  '.home-album-image',
  '.home-gallery-image',
  '.bandcamp-box',
  '.music-video-box',
  '.spud-member-wrapper',
  '.about-spuds-card',
  '.show-card',
  '.mini-tour-header-image',
  '.contact-logo',
  '.jumping-spud',
  '.img-header',
  '[data-spuddie-avoid]',
].join(',');

const INTEREST_SELECTOR = [
  '[data-spuddie-interest]',
  '.song-symbol-trigger',
  '.song-card-modal',
  '.site-nav-brand',
  '.show-card',
  '.merch-item-card',
  '.intro-video',
].join(',');

const SONG_SYMBOL_SELECTOR = '[data-spuddie-interest="song-symbol"], .song-symbol-trigger';

function getReducedMotionPreference() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getInitialPosition() {
  const fallbackSpuddieWidth = 106;
  const spawnRight = Math.random() < 0.5;

  return {
    x: spawnRight
      ? window.innerWidth + fallbackSpuddieWidth + PORTAL_EDGE_OVERFLOW
      : -fallbackSpuddieWidth - PORTAL_EDGE_OVERFLOW,
    y: MOVEMENT.navClearance,
  };
}

function WanderingSpuddie({ enabled = true }) {
  const location = useLocation();
  const spuddieRef = useRef(null);
  const timerRef = useRef(null);
  const scrollIdleTimerRef = useRef(null);
  const quickMoveTimerRef = useRef(null);
  const songCardApproachTimerRef = useRef(null);
  const attentionTimerRef = useRef(null);
  const noticeTimerRef = useRef(null);
  const noticeFrameRef = useRef(null);
  const portalTimerRefs = useRef([]);
  const portalCooldownUntilRef = useRef(0);
  const hasPlacedInitialPositionRef = useRef(false);
  const hasCompletedInitialMoveRef = useRef(false);
  const wasEnabledRef = useRef(enabled);
  const songCardModeRef = useRef(false);
  const songCardOpenRef = useRef(false);
  const songSymbolApproachRef = useRef(null);
  const noticedSongSymbolRef = useRef(null);
  const avoidRectsCacheRef = useRef(null);
  const noOpMoveCountRef = useRef(0);
  const [viewport, setViewport] = useState(() => getViewportSize());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => getReducedMotionPreference());
  const [position, setPosition] = useState(() => getInitialPosition());
  const positionRef = useRef(position);
  const [direction, setDirection] = useState('down');
  const [movementState, setMovementState] = useState(STORAGE_STATE.RESTING);
  const [songCardOpen, setSongCardOpen] = useState(false);
  const [songCardPinned, setSongCardPinned] = useState(false);
  const [songCardSide, setSongCardSide] = useState(null);
  const [suppressMovementTransition, setSuppressMovementTransition] = useState(false);
  const [quickMove, setQuickMove] = useState(false);
  const [songCardApproachMove, setSongCardApproachMove] = useState(false);
  const [moveDurationMs, setMoveDurationMs] = useState(null);
  const [portalMove, setPortalMove] = useState(false);
  const [attentionWiggle, setAttentionWiggle] = useState(false);
  const [noticeWiggle, setNoticeWiggle] = useState(false);
  const [activeTargetElement, setActiveTargetElement] = useState(null);
  const [activeTargetId, setActiveTargetId] = useState(null);
  const ignoredSongSymbolIdsRef = useRef(new Set());
  positionRef.current = position;
  songCardOpenRef.current = songCardOpen;

  const isDesktop = viewport.width >= DESKTOP_MIN_WIDTH;
  const shouldRender = enabled && isDesktop;

  const currentRect = spuddieRef.current?.getBoundingClientRect();
  const spuddieSize = {
    width: currentRect?.width || 106,
    height: currentRect?.height || 119,
  };

  const getBounds = useCallback(() => {
    const viewportTop = window.scrollY;

    return {
      minX: MOVEMENT.margin,
      minY: viewportTop + MOVEMENT.navClearance,
      maxX: Math.max(MOVEMENT.margin, viewport.width - spuddieSize.width - MOVEMENT.margin),
      maxY: Math.max(
        viewportTop + MOVEMENT.navClearance,
        viewportTop + viewport.height - spuddieSize.height - MOVEMENT.margin
      ),
    };
  }, [spuddieSize.height, spuddieSize.width, viewport.height, viewport.width]);

  const getViewportBounds = useCallback(() => {
    return {
      minX: MOVEMENT.margin,
      minY: MOVEMENT.navClearance,
      maxX: Math.max(MOVEMENT.margin, viewport.width - spuddieSize.width - MOVEMENT.margin),
      maxY: Math.max(MOVEMENT.navClearance, viewport.height - spuddieSize.height - MOVEMENT.margin),
    };
  }, [spuddieSize.height, spuddieSize.width, viewport.height, viewport.width]);

  const clampPoint = useCallback((point) => {
    const bounds = getBounds();

    return {
      x: Math.min(Math.max(point.x, bounds.minX), bounds.maxX),
      y: Math.min(Math.max(point.y, bounds.minY), bounds.maxY),
    };
  }, [getBounds]);

  const clampViewportPoint = useCallback((point) => {
    const bounds = getViewportBounds();

    return {
      x: Math.min(Math.max(point.x, bounds.minX), bounds.maxX),
      y: Math.min(Math.max(point.y, bounds.minY), bounds.maxY),
    };
  }, [getViewportBounds]);

  const getSpuddieRect = useCallback((point) => {
    return {
      left: point.x,
      top: point.y,
      right: point.x + spuddieSize.width,
      bottom: point.y + spuddieSize.height,
    };
  }, [spuddieSize.height, spuddieSize.width]);

  const getAvoidRects = useCallback(() => {
    if (avoidRectsCacheRef.current) {
      return avoidRectsCacheRef.current;
    }

    avoidRectsCacheRef.current = Array.from(document.querySelectorAll(AVOID_SELECTOR))
      .filter((element) => !spuddieRef.current?.contains(element))
      .map((element) => element.getBoundingClientRect())
      .filter((rect) => rect.width > 0 && rect.height > 0)
      .map(rectToDocumentRect);

    return avoidRectsCacheRef.current;
  }, []);

  const clearActiveTarget = useCallback(() => {
    setActiveTargetElement(null);
    setActiveTargetId(null);
    songSymbolApproachRef.current = null;
    noticedSongSymbolRef.current = null;
  }, []);

  const getFacingDirection = useCallback((from, to, fallback = direction) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    if (Math.sqrt((dx * dx) + (dy * dy)) < 4) {
      return fallback;
    }

    return getDirection(from, to);
  }, [direction]);

  const getSongSymbolMoveDuration = useCallback((from, to) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.sqrt((dx * dx) + (dy * dy));
    const duration = (distance / SONG_SYMBOL_APPROACH_PIXELS_PER_SECOND) * 1000;

    return Math.round(Math.min(
      Math.max(duration, SONG_SYMBOL_APPROACH_MIN_DURATION_MS),
      SONG_SYMBOL_APPROACH_MAX_DURATION_MS
    ));
  }, []);

  const triggerNoticeWiggle = useCallback(() => {
    window.clearTimeout(noticeTimerRef.current);
    window.cancelAnimationFrame(noticeFrameRef.current);
    setNoticeWiggle(false);
    noticeFrameRef.current = window.requestAnimationFrame(() => {
      setNoticeWiggle(true);
      noticeTimerRef.current = window.setTimeout(() => {
        setNoticeWiggle(false);
      }, NOTICE_WIGGLE_DURATION_MS);
    });
  }, []);

  const clearPortalTimers = useCallback(() => {
    portalTimerRefs.current.forEach((timerId) => window.clearTimeout(timerId));
    portalTimerRefs.current = [];
  }, []);

  const queuePortalTimer = useCallback((callback, delay) => {
    const timerId = window.setTimeout(() => {
      portalTimerRefs.current = portalTimerRefs.current.filter((id) => id !== timerId);
      callback();
    }, delay);

    portalTimerRefs.current.push(timerId);
  }, []);

  const enterPendingSongCardMode = useCallback(() => {
    songCardModeRef.current = true;
    songCardOpenRef.current = true;
    window.clearTimeout(timerRef.current);
    window.clearTimeout(scrollIdleTimerRef.current);
    window.clearTimeout(quickMoveTimerRef.current);
    window.clearTimeout(songCardApproachTimerRef.current);
    window.clearTimeout(noticeTimerRef.current);
    window.cancelAnimationFrame(noticeFrameRef.current);
    clearPortalTimers();
    avoidRectsCacheRef.current = null;
    noOpMoveCountRef.current = 0;
    setPortalMove(false);
    setQuickMove(false);
    setSongCardApproachMove(false);
    setMoveDurationMs(null);
    setNoticeWiggle(false);
    setSongCardOpen(true);
    setMovementState(STORAGE_STATE.INSPECTING);
  }, [clearPortalTimers]);

  const startQuickMove = useCallback(() => {
    setQuickMove(true);
    window.clearTimeout(quickMoveTimerRef.current);
    quickMoveTimerRef.current = window.setTimeout(() => {
      setQuickMove(false);
    }, EDGE_DOCK_TRANSITION_MS);
  }, []);

  const isSafePausePoint = useCallback((point) => {
    const spuddieRect = getSpuddieRect(point);

    return !getAvoidRects().some((rect) => {
      const buffer = rect.width < 90 && rect.height < 90 ? MOVEMENT.avoidBuffer : MOVEMENT.importantBuffer;
      return rectsOverlap(spuddieRect, rect, buffer);
    });
  }, [getAvoidRects, getSpuddieRect]);

  const isClearMovePath = useCallback((from, to) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.sqrt((dx * dx) + (dy * dy));
    const samples = Math.max(1, Math.ceil(distance / MOVE_PATH_SAMPLE_DISTANCE));
    const originRect = getSpuddieRect(from);
    const avoidRects = getAvoidRects()
      .filter((rect) => !rectsOverlap(originRect, rect, MOVE_PATH_BUFFER));

    for (let index = 1; index <= samples; index += 1) {
      const ratio = index / samples;
      const sampledRect = getSpuddieRect({
        x: from.x + dx * ratio,
        y: from.y + dy * ratio,
      });

      if (avoidRects.some((rect) => rectsOverlap(sampledRect, rect, MOVE_PATH_BUFFER))) {
        return false;
      }
    }

    return true;
  }, [getAvoidRects, getSpuddieRect]);

  const shouldPortalToward = useCallback((origin, destination) => {
    if (portalMove || Date.now() < portalCooldownUntilRef.current) {
      return false;
    }

    const dx = destination.x - origin.x;
    const dy = destination.y - origin.y;
    const distance = Math.sqrt((dx * dx) + (dy * dy));
    const horizontalDistance = Math.abs(dx);
    const longHorizontalRoute = horizontalDistance > viewport.width * 0.54 && distance > viewport.width * 0.6;

    if (!longHorizontalRoute) {
      return false;
    }

    return !isClearMovePath(origin, destination);
  }, [isClearMovePath, portalMove, viewport.width]);

  const getBlockingRectsForPath = useCallback((from, to) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.sqrt((dx * dx) + (dy * dy));
    const samples = Math.max(1, Math.ceil(distance / MOVE_PATH_SAMPLE_DISTANCE));
    const originRect = getSpuddieRect(from);
    const avoidRects = getAvoidRects()
      .filter((rect) => !rectsOverlap(originRect, rect, MOVE_PATH_BUFFER));
    const blockingRects = [];

    for (let index = 1; index <= samples; index += 1) {
      const ratio = index / samples;
      const sampledRect = getSpuddieRect({
        x: from.x + dx * ratio,
        y: from.y + dy * ratio,
      });

      avoidRects.forEach((rect) => {
        if (!blockingRects.includes(rect) && rectsOverlap(sampledRect, rect, MOVE_PATH_BUFFER)) {
          blockingRects.push(rect);
        }
      });
    }

    return blockingRects;
  }, [getAvoidRects, getSpuddieRect]);

  const getObstacleWaypointCandidates = useCallback((origin, destination) => {
    return getBlockingRectsForPath(origin, destination)
      .slice(0, 3)
      .flatMap((rect) => {
        const gap = MOVE_PATH_BUFFER + MOVEMENT.importantBuffer;
        const leftX = rect.left - spuddieSize.width - gap;
        const rightX = rect.right + gap;
        const topY = rect.top - spuddieSize.height - gap;
        const bottomY = rect.bottom + gap;
        const midY = rect.top + (rect.height - spuddieSize.height) / 2;
        const midX = rect.left + (rect.width - spuddieSize.width) / 2;

        return [
          { x: leftX, y: midY },
          { x: rightX, y: midY },
          { x: midX, y: topY },
          { x: midX, y: bottomY },
          { x: leftX, y: topY },
          { x: leftX, y: bottomY },
          { x: rightX, y: topY },
          { x: rightX, y: bottomY },
        ];
      })
      .map(clampPoint)
      .filter((point, index, points) => {
        return points.findIndex((candidate) => {
          return Math.abs(candidate.x - point.x) < 4 && Math.abs(candidate.y - point.y) < 4;
        }) === index;
      });
  }, [clampPoint, getBlockingRectsForPath, spuddieSize.height, spuddieSize.width]);

  const findNearbySafePoint = useCallback((origin) => {
    const distances = [
      [MOVEMENT.minStepDistance, MOVEMENT.maxStepDistance],
      [36, MOVEMENT.minStepDistance],
    ];

    for (const [minDistance, maxDistance] of distances) {
      for (let attempt = 0; attempt < 32; attempt += 1) {
        const angle = Math.random() * Math.PI * 2;
        const distance = getRandomBetween(minDistance, maxDistance);
        const point = clampPoint({
          x: origin.x + Math.cos(angle) * distance,
          y: origin.y + Math.sin(angle) * distance,
        });

        if (isSafePausePoint(point) && isClearMovePath(origin, point)) {
          return point;
        }
      }
    }

    return origin;
  }, [clampPoint, isClearMovePath, isSafePausePoint]);

  const findApproachStep = useCallback((origin, destination) => {
    const dx = destination.x - origin.x;
    const dy = destination.y - origin.y;
    const distance = Math.sqrt((dx * dx) + (dy * dy));

    if (distance === 0) {
      return destination;
    }

    const baseAngle = Math.atan2(dy, dx);
    const stepDistance = Math.min(distance, SONG_SYMBOL_APPROACH_STEP_DISTANCE);
    const angleOffsets = [0, 0.45, -0.45, 0.9, -0.9, 1.35, -1.35, Math.PI / 2, -Math.PI / 2];
    const angledCandidatePoints = angleOffsets
      .flatMap((offset) => {
        const angle = baseAngle + offset;

        return [stepDistance, stepDistance * 0.62].map((candidateDistance) => {
          return offset === 0 && candidateDistance === stepDistance && distance <= SONG_SYMBOL_APPROACH_STEP_DISTANCE
            ? destination
            : clampPoint({
                x: origin.x + Math.cos(angle) * candidateDistance,
                y: origin.y + Math.sin(angle) * candidateDistance,
              });
        });
      })
      .filter((point, index, points) => {
        return points.findIndex((candidate) => {
          return Math.abs(candidate.x - point.x) < 4 && Math.abs(candidate.y - point.y) < 4;
        }) === index;
      });
    const directPathIsClear = isClearMovePath(origin, destination);
    const obstacleCandidatePoints = directPathIsClear ? [] : getObstacleWaypointCandidates(origin, destination);
    const candidates = [...angledCandidatePoints, ...obstacleCandidatePoints]
      .map((point) => {
        const nextDx = destination.x - point.x;
        const nextDy = destination.y - point.y;

        return {
          point,
          distanceToDestination: Math.sqrt((nextDx * nextDx) + (nextDy * nextDy)),
          distanceFromOrigin: Math.sqrt(((point.x - origin.x) ** 2) + ((point.y - origin.y) ** 2)),
          pathClear: isClearMovePath(origin, point),
          safe: isSafePausePoint(point),
          nextPathClear: isClearMovePath(point, destination),
        };
      })
      .sort((a, b) => {
        if (a.pathClear !== b.pathClear) {
          return a.pathClear ? -1 : 1;
        }

        if (a.safe !== b.safe) {
          return a.safe ? -1 : 1;
        }

        if (a.nextPathClear !== b.nextPathClear) {
          return a.nextPathClear ? -1 : 1;
        }

        if (Math.abs(a.distanceToDestination - b.distanceToDestination) < 12) {
          return b.distanceFromOrigin - a.distanceFromOrigin;
        }

        return a.distanceToDestination - b.distanceToDestination;
      });

    return candidates.find((candidate) => candidate.pathClear && candidate.safe)?.point ||
      candidates.find((candidate) => candidate.pathClear)?.point ||
      origin;
  }, [clampPoint, getObstacleWaypointCandidates, isClearMovePath, isSafePausePoint]);

  const findNearestVisibleEdgePoint = useCallback((origin) => {
    const bounds = getBounds();
    const clampedOrigin = clampPoint(origin);
    const currentY = Math.min(Math.max(origin.y, bounds.minY), bounds.maxY);
    const currentX = Math.min(Math.max(origin.x, bounds.minX), bounds.maxX);
    const candidates = [
      { x: bounds.minX, y: currentY },
      { x: bounds.maxX, y: currentY },
      { x: currentX, y: bounds.minY },
      { x: currentX, y: bounds.maxY },
    ];

    const edgeCandidates = candidates
      .map((candidate) => {
        const point = clampPoint(candidate);
        const dx = point.x - clampedOrigin.x;
        const dy = point.y - clampedOrigin.y;

        return {
          point,
          distance: Math.sqrt((dx * dx) + (dy * dy)),
          pathClear: isClearMovePath(clampedOrigin, point),
          safe: isSafePausePoint(point),
        };
      })
      .sort((a, b) => {
        if (a.pathClear !== b.pathClear) {
          return a.pathClear ? -1 : 1;
        }

        if (a.safe !== b.safe) {
          return a.safe ? -1 : 1;
        }

        return a.distance - b.distance;
      });

    return edgeCandidates.find((candidate) => candidate.pathClear && candidate.safe)?.point ||
      edgeCandidates.find((candidate) => candidate.pathClear)?.point ||
      clampedOrigin;
  }, [clampPoint, getBounds, isClearMovePath, isSafePausePoint]);

  const getPointDistance = useCallback((from, to) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    return Math.sqrt((dx * dx) + (dy * dy));
  }, []);

  const findEscapePoint = useCallback((origin) => {
    const angleStep = Math.PI / 6;
    const distances = [170, 120, 220, 80];
    const candidates = [];

    for (let angleIndex = 0; angleIndex < 12; angleIndex += 1) {
      const angle = angleIndex * angleStep;

      distances.forEach((distance) => {
        const point = clampPoint({
          x: origin.x + Math.cos(angle) * distance,
          y: origin.y + Math.sin(angle) * distance,
        });

        candidates.push({
          point,
          distance: getPointDistance(origin, point),
          pathClear: isClearMovePath(origin, point),
          safe: isSafePausePoint(point),
        });
      });
    }

    const viableCandidates = candidates
      .filter((candidate) => candidate.distance >= MIN_EFFECTIVE_MOVE_DISTANCE)
      .sort((a, b) => {
        if (a.pathClear !== b.pathClear) {
          return a.pathClear ? -1 : 1;
        }

        if (a.safe !== b.safe) {
          return a.safe ? -1 : 1;
        }

        return b.distance - a.distance;
      });

    return viableCandidates.find((candidate) => candidate.pathClear && candidate.safe)?.point ||
      viableCandidates.find((candidate) => candidate.pathClear)?.point ||
      viableCandidates.find((candidate) => candidate.safe)?.point ||
      findNearestVisibleEdgePoint(origin);
  }, [clampPoint, findNearestVisibleEdgePoint, getPointDistance, isClearMovePath, isSafePausePoint]);

  const resolveStuckMove = useCallback((origin, proposedPoint) => {
    if (getPointDistance(origin, proposedPoint) >= MIN_EFFECTIVE_MOVE_DISTANCE) {
      noOpMoveCountRef.current = 0;
      return proposedPoint;
    }

    noOpMoveCountRef.current += 1;

    if (noOpMoveCountRef.current < STUCK_STEP_LIMIT) {
      return proposedPoint;
    }

    const escapePoint = findEscapePoint(origin);

    if (getPointDistance(origin, escapePoint) >= MIN_EFFECTIVE_MOVE_DISTANCE) {
      noOpMoveCountRef.current = 0;
      return escapePoint;
    }

    return proposedPoint;
  }, [findEscapePoint, getPointDistance]);

  const startPortalMove = useCallback((origin) => {
    const bounds = getBounds();
    const midpoint = (bounds.minX + bounds.maxX) / 2;
    const exitRight = origin.x >= midpoint;
    const directionToFace = exitRight ? 'right' : 'left';
    const travelY = Math.min(Math.max(origin.y, bounds.minY), bounds.maxY);
    const exitPoint = {
      x: exitRight ? bounds.maxX + spuddieSize.width + PORTAL_EDGE_OVERFLOW : -spuddieSize.width - PORTAL_EDGE_OVERFLOW,
      y: travelY,
    };
    const entryOffscreenPoint = {
      x: exitRight ? -spuddieSize.width - PORTAL_EDGE_OVERFLOW : bounds.maxX + spuddieSize.width + PORTAL_EDGE_OVERFLOW,
      y: travelY,
    };
    const entryPoint = {
      x: exitRight ? bounds.minX : bounds.maxX,
      y: travelY,
    };

    clearPortalTimers();
    window.clearTimeout(timerRef.current);
    avoidRectsCacheRef.current = null;
    noOpMoveCountRef.current = 0;
    portalCooldownUntilRef.current = Date.now() + PORTAL_COOLDOWN_MS;
    setPortalMove(true);
    setQuickMove(false);
    setSongCardApproachMove(false);
    setMoveDurationMs(PORTAL_EXIT_DURATION_MS);
    setDirection(directionToFace);
    setMovementState(STORAGE_STATE.WANDERING);
    setPosition(exitPoint);

    queuePortalTimer(() => {
      setSuppressMovementTransition(true);
      setPosition(entryOffscreenPoint);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setSuppressMovementTransition(false);
          setMoveDurationMs(PORTAL_ENTRY_DURATION_MS);
          setDirection(directionToFace);
          setPosition(entryPoint);
        });
      });
    }, PORTAL_EXIT_DURATION_MS);

    queuePortalTimer(() => {
      setPortalMove(false);
      setMoveDurationMs(null);
      noOpMoveCountRef.current = 0;
    }, PORTAL_EXIT_DURATION_MS + PORTAL_ENTRY_DURATION_MS + 80);
  }, [clearPortalTimers, getBounds, queuePortalTimer, spuddieSize.width]);

  const startInitialEntry = useCallback((origin) => {
    const bounds = getBounds();
    const enterFromRight = origin.x > viewport.width / 2;
    const entryOffscreenPoint = {
      x: enterFromRight ? bounds.maxX + spuddieSize.width + PORTAL_EDGE_OVERFLOW : -spuddieSize.width - PORTAL_EDGE_OVERFLOW,
      y: bounds.minY,
    };
    const entryPoint = {
      x: enterFromRight ? bounds.maxX : bounds.minX,
      y: bounds.minY,
    };

    clearPortalTimers();
    window.clearTimeout(timerRef.current);
    avoidRectsCacheRef.current = null;
    noOpMoveCountRef.current = 0;
    setSuppressMovementTransition(true);
    setPortalMove(true);
    setQuickMove(false);
    setSongCardApproachMove(false);
    setMoveDurationMs(null);
    setDirection(enterFromRight ? 'left' : 'right');
    setMovementState(STORAGE_STATE.WANDERING);
    setPosition(entryOffscreenPoint);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setSuppressMovementTransition(false);
        setMoveDurationMs(INITIAL_ENTRY_DURATION_MS);
        setPosition(entryPoint);
      });
    });

    queuePortalTimer(() => {
      setPortalMove(false);
      setMoveDurationMs(null);
      noOpMoveCountRef.current = 0;
    }, INITIAL_ENTRY_DURATION_MS + 120);
  }, [clearPortalTimers, getBounds, queuePortalTimer, spuddieSize.width, viewport.width]);

  const getInterestTargets = useCallback((origin) => {
    return Array.from(document.querySelectorAll(INTEREST_SELECTOR))
      .filter((element) => !spuddieRef.current?.contains(element))
      .map((element) => element.getBoundingClientRect())
      .filter((rect) => rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < viewport.height)
      .map(rectToDocumentRect)
      .filter((rect) => {
        if (!origin) {
          return true;
        }

        const targetCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
        const dx = targetCenter.x - origin.x;
        const dy = targetCenter.y - origin.y;

        return Math.sqrt((dx * dx) + (dy * dy)) <= MOVEMENT.maxInspectDistance;
      });
  }, [viewport.height]);

  const findPointNearRect = useCallback((rect, origin = null) => {
    const gap = 18;
    const candidates = [
      { x: rect.left - spuddieSize.width - gap, y: rect.top + (rect.height - spuddieSize.height) / 2 },
      { x: rect.right + gap, y: rect.top + (rect.height - spuddieSize.height) / 2 },
      { x: rect.left + (rect.width - spuddieSize.width) / 2, y: rect.top - spuddieSize.height - gap },
      { x: rect.left + (rect.width - spuddieSize.width) / 2, y: rect.bottom + gap },
    ];

    const safeCandidate = candidates
      .map(clampPoint)
      .find((candidate) => {
        if (!isSafePausePoint(candidate)) {
          return false;
        }

        return !origin || isClearMovePath(origin, candidate);
      });

    return safeCandidate || null;
  }, [clampPoint, isClearMovePath, isSafePausePoint, spuddieSize.height, spuddieSize.width]);

  const findPointBesideRect = useCallback((rect, origin, gap = 18, preferredSide = null) => {
    const candidates = [
      {
        side: 'left',
        direction: 'right',
        point: {
          x: rect.left - spuddieSize.width - gap,
          y: rect.top + (rect.height - spuddieSize.height) / 2,
        },
      },
      {
        side: 'right',
        direction: 'left',
        point: {
          x: rect.right + gap,
          y: rect.top + (rect.height - spuddieSize.height) / 2,
        },
      },
    ]
      .map((candidate) => {
        const point = clampPoint(candidate.point);
        const dx = point.x - origin.x;
        const dy = point.y - origin.y;

        return {
          ...candidate,
          point,
          distance: Math.sqrt((dx * dx) + (dy * dy)),
          pathClear: isClearMovePath(origin, point),
          safe: isSafePausePoint(point),
        };
      })
      .sort((a, b) => {
        if (a.safe !== b.safe) {
          return a.safe ? -1 : 1;
        }

        if (a.pathClear !== b.pathClear) {
          return a.pathClear ? -1 : 1;
        }

        if (preferredSide && a.side !== b.side) {
          return a.side === preferredSide ? -1 : 1;
        }

        return a.distance - b.distance;
      });

    return candidates.find((candidate) => preferredSide && candidate.side === preferredSide && candidate.safe && candidate.pathClear) ||
      candidates.find((candidate) => preferredSide && candidate.side === preferredSide && candidate.safe) ||
      candidates.find((candidate) => candidate.safe && candidate.pathClear) ||
      candidates.find((candidate) => candidate.safe) ||
      candidates[0] ||
      null;
  }, [clampPoint, isClearMovePath, isSafePausePoint, spuddieSize.height, spuddieSize.width]);

  const findSongCardReadingPoint = useCallback((rect, origin, clamp = clampPoint) => {
    const cardTop = rect.top + rect.height * 0.4;
    const cardBottom = Math.max(
      cardTop,
      rect.bottom - Math.max(SONG_CARD_VERTICAL_PADDING, rect.height * 0.15) - spuddieSize.height / 2
    );
    const readableHeight = Math.max(0, cardBottom - cardTop);
    const verticalBands = [
      [cardTop, cardTop + readableHeight * 0.34],
      [cardTop + readableHeight * 0.36, cardTop + readableHeight * 0.68],
      [cardTop + readableHeight * 0.7, cardBottom],
    ];
    const selectedBand = verticalBands[getRandomBetween(0, verticalBands.length - 1)];
    const targetCenterY = readableHeight > 0
      ? getRandomBetween(Math.round(selectedBand[0]), Math.round(selectedBand[1]))
      : rect.top + rect.height / 2;
    const targetY = targetCenterY - spuddieSize.height / 2;
    const sideCandidates = [
      {
        side: 'left',
        direction: 'right',
        point: {
          x: rect.left - spuddieSize.width - SONG_CARD_EDGE_GAP,
          y: targetY,
        },
      },
      {
        side: 'right',
        direction: 'left',
        point: {
          x: rect.right + SONG_CARD_EDGE_GAP,
          y: targetY,
        },
      },
    ]
      .map((candidate) => {
        const point = clamp(candidate.point);
        const dx = point.x - origin.x;
        const dy = point.y - origin.y;

        return {
          ...candidate,
          point,
          distance: Math.sqrt((dx * dx) + (dy * dy)),
        };
      })
      .sort((a, b) => a.distance - b.distance);

    for (const candidate of sideCandidates) {
      const spuddieRect = getSpuddieRect(candidate.point);
      const cardOverlap = rectsOverlap(spuddieRect, rect, MOVEMENT.avoidBuffer);

      if (!cardOverlap) {
        return {
          point: candidate.point,
          direction: candidate.direction,
          side: candidate.side,
        };
      }
    }

    const fallback = sideCandidates[0];

    return {
      point: fallback.point,
      direction: fallback.direction,
      side: fallback.side,
    };
  }, [clampPoint, getSpuddieRect, spuddieSize.height, spuddieSize.width]);

  const findInspectionPoint = useCallback((origin) => {
    const targets = getInterestTargets(origin);

    if (targets.length === 0) {
      return null;
    }

    const shuffledTargets = [...targets].sort(() => Math.random() - 0.5);

    for (const target of shuffledTargets.slice(0, 8)) {
      const point = findPointNearRect(target, origin);

      if (point) {
        return { point, target };
      }
    }

    return null;
  }, [findPointNearRect, getInterestTargets]);

  const resetIgnoredSongSymbolsThatLeftViewport = useCallback(() => {
    if (ignoredSongSymbolIdsRef.current.size === 0) {
      return;
    }

    const visibleIgnoredIds = new Set(
      Array.from(document.querySelectorAll(SONG_SYMBOL_SELECTOR))
        .filter(isElementVisibleInViewport)
        .map((element) => element.dataset.spuddieTargetId)
        .filter(Boolean)
    );

    ignoredSongSymbolIdsRef.current.forEach((targetId) => {
      if (!visibleIgnoredIds.has(targetId)) {
        ignoredSongSymbolIdsRef.current.delete(targetId);
      }
    });
  }, []);

  const hasVisibleUnclickedSongSymbol = useCallback(() => {
    return Array.from(document.querySelectorAll(SONG_SYMBOL_SELECTOR))
      .filter((element) => !spuddieRef.current?.contains(element))
      .some((element) => {
        const targetId = element.dataset.spuddieTargetId;

        return isElementVisibleInViewport(element) &&
          (!targetId || !ignoredSongSymbolIdsRef.current.has(targetId));
      });
  }, []);

  const findNearestSongSymbolInspectionPoint = useCallback((origin) => {
    const songSymbols = Array.from(document.querySelectorAll(SONG_SYMBOL_SELECTOR))
      .filter((element) => !spuddieRef.current?.contains(element))
      .filter((element) => {
        const targetId = element.dataset.spuddieTargetId;
        return !targetId || !ignoredSongSymbolIdsRef.current.has(targetId);
      })
      .map((element) => ({
        element,
        targetId: element.dataset.spuddieTargetId || null,
        rect: element.getBoundingClientRect(),
      }))
      .filter(({ element }) => isElementVisibleInViewport(element))
      .map(({ element, targetId, rect }) => ({
        element,
        targetId,
        rect: rectToDocumentRect(rect),
      }))
      .map(({ element, targetId, rect }) => {
        const targetCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
        const dx = targetCenter.x - origin.x;
        const dy = targetCenter.y - origin.y;

        return {
          element,
          targetId,
          rect,
          distance: Math.sqrt((dx * dx) + (dy * dy)),
        };
      })
      .sort((a, b) => a.distance - b.distance);

    for (const target of songSymbols.slice(0, 6)) {
      const targetCenterX = target.rect.left + target.rect.width / 2;
      const preferredSide = songSymbolApproachRef.current?.targetId === target.targetId
        ? songSymbolApproachRef.current.side
        : origin.x <= targetCenterX ? 'left' : 'right';
      const readingPoint = findPointBesideRect(target.rect, origin, 22, preferredSide);

      if (readingPoint) {
        if (songSymbolApproachRef.current?.targetId !== target.targetId) {
          songSymbolApproachRef.current = {
            targetId: target.targetId,
            element: target.element,
            side: preferredSide,
          };
        }

        return {
          point: readingPoint.point,
          direction: readingPoint.direction,
          side: readingPoint.side,
          target: target.rect,
          targetElement: target.element,
          targetId: target.targetId,
        };
      }
    }

    songSymbolApproachRef.current = null;
    return null;
  }, [findPointBesideRect]);

  const takeStep = useCallback(() => {
    if (!shouldRender || prefersReducedMotion || songCardOpen || songCardModeRef.current || portalMove) {
      return;
    }

    avoidRectsCacheRef.current = null;

    if (attentionWiggle) {
      return;
    }

    resetIgnoredSongSymbolsThatLeftViewport();

    if (activeTargetElement) {
      const activeTargetWasIgnored = activeTargetId && ignoredSongSymbolIdsRef.current.has(activeTargetId);

      if (!activeTargetWasIgnored && isElementVisibleInViewport(activeTargetElement)) {
        noOpMoveCountRef.current = 0;
        setMoveDurationMs(null);
        setMovementState(STORAGE_STATE.INSPECTING);
        return;
      }

      clearActiveTarget();
    }

    const previousTargetKey = songSymbolApproachRef.current?.targetId || songSymbolApproachRef.current?.element || null;
    const songSymbolInspection = findNearestSongSymbolInspectionPoint(position);

    if (songSymbolInspection) {
      const targetKey = songSymbolInspection.targetId || songSymbolInspection.targetElement;
      const isFreshTarget = targetKey && targetKey !== previousTargetKey && targetKey !== noticedSongSymbolRef.current;

      if (isFreshTarget) {
        noticedSongSymbolRef.current = targetKey;
        triggerNoticeWiggle();
      }

      if (shouldPortalToward(position, songSymbolInspection.point)) {
        startPortalMove(position);
        return;
      }

      const dx = songSymbolInspection.point.x - position.x;
      const dy = songSymbolInspection.point.y - position.y;
      const distance = Math.sqrt((dx * dx) + (dy * dy));
      const hasArrived = distance <= SONG_SYMBOL_ARRIVAL_DISTANCE;
      const proposedPoint = hasArrived ? songSymbolInspection.point : findApproachStep(position, songSymbolInspection.point);
      const nextPoint = hasArrived ? proposedPoint : resolveStuckMove(position, proposedPoint);

      setMoveDurationMs(hasArrived ? SONG_SYMBOL_SETTLE_DURATION_MS : getSongSymbolMoveDuration(position, nextPoint));
      setDirection(hasArrived ? songSymbolInspection.direction : getFacingDirection(position, nextPoint));
      setMovementState(STORAGE_STATE.INSPECTING);
      setActiveTargetElement(hasArrived ? songSymbolInspection.targetElement : null);
      setActiveTargetId(hasArrived ? songSymbolInspection.targetId : null);
      setPosition(nextPoint);
      return;
    }

    songSymbolApproachRef.current = null;
    noticedSongSymbolRef.current = null;

    if (Math.random() < ATTENTION_WIGGLE_CHANCE) {
      setMoveDurationMs(null);
      setDirection('down');
      setMovementState(STORAGE_STATE.RESTING);
      setAttentionWiggle(true);
      window.clearTimeout(attentionTimerRef.current);
      attentionTimerRef.current = window.setTimeout(() => {
        setAttentionWiggle(false);
      }, ATTENTION_WIGGLE_DURATION_MS);
      return;
    }

    const shouldInspect = !songSymbolInspection && Math.random() < MOVEMENT.inspectChance;
    const inspection = shouldInspect ? findInspectionPoint(position) : null;
    const shouldPortalWander = !inspection &&
      hasCompletedInitialMoveRef.current &&
      Date.now() >= portalCooldownUntilRef.current &&
      Math.random() < MOVEMENT.portalChance;

    if (shouldPortalWander) {
      startPortalMove(position);
      return;
    }

    const proposedPoint = inspection?.point || findNearbySafePoint(position);
    const nextPoint = resolveStuckMove(position, proposedPoint);

    setMoveDurationMs(null);
    setDirection(inspection?.direction || getFacingDirection(position, nextPoint));
    setMovementState(inspection ? STORAGE_STATE.INSPECTING : STORAGE_STATE.WANDERING);
    setActiveTargetElement(inspection?.targetElement || null);
    setActiveTargetId(inspection?.targetId || null);
    setPosition(nextPoint);
    hasCompletedInitialMoveRef.current = true;
  }, [activeTargetElement, activeTargetId, attentionWiggle, clearActiveTarget, findApproachStep, findInspectionPoint, findNearestSongSymbolInspectionPoint, findNearbySafePoint, getFacingDirection, getSongSymbolMoveDuration, portalMove, position, prefersReducedMotion, resetIgnoredSongSymbolsThatLeftViewport, resolveStuckMove, shouldPortalToward, shouldRender, songCardOpen, startPortalMove, triggerNoticeWiggle]);

  const moveOnInteraction = useCallback(() => {
    if (!shouldRender || prefersReducedMotion || portalMove) {
      return;
    }

    if (songCardOpen || songCardModeRef.current) {
      setMoveDurationMs(null);
      setMovementState(STORAGE_STATE.INSPECTING);
      triggerNoticeWiggle();
      return;
    }

    if (activeTargetElement && isElementVisibleInViewport(activeTargetElement)) {
      setMoveDurationMs(null);
      setMovementState(STORAGE_STATE.INSPECTING);
      triggerNoticeWiggle();
      return;
    }

    resetIgnoredSongSymbolsThatLeftViewport();

    if (hasVisibleUnclickedSongSymbol()) {
      setMoveDurationMs(null);
      setMovementState(STORAGE_STATE.INSPECTING);
      triggerNoticeWiggle();
      return;
    }

    avoidRectsCacheRef.current = null;
    noOpMoveCountRef.current = 0;
    clearPortalTimers();
    setPortalMove(false);
    window.clearTimeout(timerRef.current);
    window.clearTimeout(noticeTimerRef.current);
    window.cancelAnimationFrame(noticeFrameRef.current);
    setNoticeWiggle(false);
    setPosition((currentPosition) => {
      const nextPoint = findNearbySafePoint(currentPosition);

      startQuickMove();
      clearActiveTarget();
      setMoveDurationMs(null);
      setDirection(getFacingDirection(currentPosition, nextPoint));
      setMovementState(STORAGE_STATE.WANDERING);

      return nextPoint;
    });
  }, [activeTargetElement, clearActiveTarget, clearPortalTimers, findNearbySafePoint, getFacingDirection, hasVisibleUnclickedSongSymbol, portalMove, prefersReducedMotion, resetIgnoredSongSymbolsThatLeftViewport, shouldRender, songCardOpen, startQuickMove, triggerNoticeWiggle]);

  useLayoutEffect(() => {
    if (!shouldRender || prefersReducedMotion) {
      return undefined;
    }

    const handleSongCardOpen = (event) => {
      songCardModeRef.current = true;
      songCardOpenRef.current = true;
      avoidRectsCacheRef.current = null;
      window.clearTimeout(timerRef.current);
      window.clearTimeout(scrollIdleTimerRef.current);
      window.clearTimeout(quickMoveTimerRef.current);
      window.clearTimeout(songCardApproachTimerRef.current);
      const cardRect = event.detail?.rect;

      if (!cardRect) {
        return;
      }

      enterPendingSongCardMode();
      const spuddieRect = spuddieRef.current?.getBoundingClientRect();
      const currentViewportPosition = spuddieRect
        ? {
            x: spuddieRect.left,
            y: spuddieRect.top,
          }
        : songCardPinned
          ? position
          : {
              x: position.x - window.scrollX,
              y: position.y - window.scrollY,
            };
      const readingTarget = findSongCardReadingPoint(cardRect, currentViewportPosition, clampViewportPoint);

      if (!readingTarget) {
        return;
      }

      setSuppressMovementTransition(true);
      setPosition(currentViewportPosition);
      clearActiveTarget();
      setSongCardApproachMove(true);
      setSongCardOpen(true);
      setSongCardPinned(true);
      setSongCardSide(readingTarget.side);
      setMovementState(STORAGE_STATE.INSPECTING);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setSuppressMovementTransition(false);
          setDirection(readingTarget.direction);
          setPosition(readingTarget.point);
          songCardApproachTimerRef.current = window.setTimeout(() => {
            if (songCardModeRef.current) {
              setSongCardApproachMove(false);
              setMovementState(STORAGE_STATE.INSPECTING);
            }
          }, SONG_CARD_APPROACH_TRANSITION_MS);
        });
      });
    };

    const handleSongCardClose = () => {
      songCardModeRef.current = false;
      songCardOpenRef.current = false;
      avoidRectsCacheRef.current = null;
      noOpMoveCountRef.current = 0;
      window.clearTimeout(songCardApproachTimerRef.current);
      clearPortalTimers();
      setPortalMove(false);
      const currentDocumentPosition = songCardPinned
        ? {
            x: position.x + window.scrollX,
            y: position.y + window.scrollY,
          }
        : position;

      if (songCardPinned) {
        const awayX = songCardSide === 'left' ? -SONG_CARD_CLOSE_STEP_DISTANCE : SONG_CARD_CLOSE_STEP_DISTANCE;
        const nextPoint = clampPoint({
          x: currentDocumentPosition.x + awayX,
          y: currentDocumentPosition.y + getRandomBetween(-24, 24),
        });

        setSuppressMovementTransition(true);
        setSongCardApproachMove(false);
        setMoveDurationMs(null);
        setDirection(getFacingDirection(currentDocumentPosition, nextPoint));
        setMovementState(STORAGE_STATE.WANDERING);
        clearActiveTarget();
        setPosition(currentDocumentPosition);
        setSongCardPinned(false);
        setSongCardOpen(false);
        setSongCardSide(null);

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            setSuppressMovementTransition(false);
            setPosition(nextPoint);
          });
        });
        return;
      }

      setSongCardOpen(false);
      setSongCardApproachMove(false);
      setMoveDurationMs(null);
      const nextPoint = findNearbySafePoint(currentDocumentPosition);
      setDirection(getFacingDirection(currentDocumentPosition, nextPoint));
      setMovementState(STORAGE_STATE.WANDERING);
      clearActiveTarget();
      setPosition(nextPoint);
    };

    window.addEventListener(SPUDDIE_EVENTS.SONG_CARD_OPEN, handleSongCardOpen);
    window.addEventListener(SPUDDIE_EVENTS.SONG_CARD_CLOSE, handleSongCardClose);

    return () => {
      window.removeEventListener(SPUDDIE_EVENTS.SONG_CARD_OPEN, handleSongCardOpen);
      window.removeEventListener(SPUDDIE_EVENTS.SONG_CARD_CLOSE, handleSongCardClose);
    };
  }, [clampPoint, clampViewportPoint, clearActiveTarget, clearPortalTimers, enterPendingSongCardMode, findNearbySafePoint, findSongCardReadingPoint, getFacingDirection, position, prefersReducedMotion, shouldRender, songCardPinned, songCardSide]);

  useEffect(() => {
    if (!shouldRender) {
      return undefined;
    }

    const handleSongSymbolClick = (event) => {
      const targetId = event.detail?.targetId;

      if (!targetId) {
        return;
      }

      ignoredSongSymbolIdsRef.current.add(targetId);
      enterPendingSongCardMode();

      if (activeTargetId === targetId || songSymbolApproachRef.current?.targetId === targetId) {
        clearActiveTarget();
      }
    };

    window.addEventListener(SPUDDIE_EVENTS.SONG_SYMBOL_CLICK, handleSongSymbolClick);

    return () => {
      window.removeEventListener(SPUDDIE_EVENTS.SONG_SYMBOL_CLICK, handleSongSymbolClick);
    };
  }, [activeTargetId, clearActiveTarget, enterPendingSongCardMode, shouldRender]);

  useEffect(() => {
    const handleResize = () => {
      avoidRectsCacheRef.current = null;
      setViewport(getViewportSize());

      if (songCardModeRef.current || songCardOpenRef.current) {
        return;
      }

      setPosition((current) => clampPoint(current));
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      setPrefersReducedMotion(motionQuery.matches);
    };

    window.addEventListener('resize', handleResize);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, [clampPoint]);

  useEffect(() => {
    if (!shouldRender || songCardOpen || songCardModeRef.current || prefersReducedMotion) {
      return undefined;
    }

    const handleScroll = () => {
      if (songCardModeRef.current) {
        return;
      }

      window.clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = window.setTimeout(() => {
        if (songCardModeRef.current) {
          return;
        }

        avoidRectsCacheRef.current = null;
        resetIgnoredSongSymbolsThatLeftViewport();

        if (activeTargetElement) {
          if (!isElementVisibleInViewport(activeTargetElement)) {
            clearActiveTarget();
            setPosition((currentPosition) => {
              const nextPoint = findNearestVisibleEdgePoint(currentPosition);

              startQuickMove();
              setDirection(getFacingDirection(currentPosition, nextPoint));
              setMovementState(STORAGE_STATE.WANDERING);

              return nextPoint;
            });
            return;
          }

          setMovementState(STORAGE_STATE.INSPECTING);
          return;
        }

        setPosition((currentPosition) => {
          const nextPoint = findNearestVisibleEdgePoint(currentPosition);

          startQuickMove();
          setDirection(getFacingDirection(currentPosition, nextPoint));
          setMovementState(STORAGE_STATE.WANDERING);

          return nextPoint;
        });
      }, SCROLL_IDLE_DELAY_MS);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.clearTimeout(scrollIdleTimerRef.current);
      window.clearTimeout(quickMoveTimerRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTargetElement, clearActiveTarget, findNearestVisibleEdgePoint, getFacingDirection, prefersReducedMotion, resetIgnoredSongSymbolsThatLeftViewport, shouldRender, songCardOpen, startQuickMove]);

  useEffect(() => {
    const wasEnabled = wasEnabledRef.current;
    wasEnabledRef.current = enabled;

    if (!shouldRender) {
      songCardModeRef.current = false;
      songCardOpenRef.current = false;
      window.clearTimeout(timerRef.current);
      window.clearTimeout(scrollIdleTimerRef.current);
      window.clearTimeout(quickMoveTimerRef.current);
      window.clearTimeout(songCardApproachTimerRef.current);
      window.clearTimeout(attentionTimerRef.current);
      window.clearTimeout(noticeTimerRef.current);
      window.cancelAnimationFrame(noticeFrameRef.current);
      clearPortalTimers();
      setPortalMove(false);
      setMoveDurationMs(null);
      setSuppressMovementTransition(false);
      return;
    }

    const shouldRunEntry = !hasPlacedInitialPositionRef.current || (enabled && !wasEnabled);

    if (shouldRunEntry) {
      hasPlacedInitialPositionRef.current = true;
      hasCompletedInitialMoveRef.current = false;
      startInitialEntry(positionRef.current);
      return;
    }

    if (songCardModeRef.current || songCardOpenRef.current) {
      window.clearTimeout(timerRef.current);
      window.clearTimeout(scrollIdleTimerRef.current);
      window.clearTimeout(quickMoveTimerRef.current);
      window.clearTimeout(attentionTimerRef.current);
      window.clearTimeout(noticeTimerRef.current);
      window.cancelAnimationFrame(noticeFrameRef.current);
      clearPortalTimers();
      avoidRectsCacheRef.current = null;
      setPortalMove(false);
      setQuickMove(false);
      setSuppressMovementTransition(false);
      setMovementState(STORAGE_STATE.INSPECTING);
      return;
    }

    window.clearTimeout(timerRef.current);
    window.clearTimeout(scrollIdleTimerRef.current);
    window.clearTimeout(quickMoveTimerRef.current);
    window.clearTimeout(songCardApproachTimerRef.current);
    window.clearTimeout(attentionTimerRef.current);
    window.clearTimeout(noticeTimerRef.current);
    window.cancelAnimationFrame(noticeFrameRef.current);
    clearPortalTimers();
    avoidRectsCacheRef.current = null;

    clearActiveTarget();
    noticedSongSymbolRef.current = null;
    setAttentionWiggle(false);
    setNoticeWiggle(false);
    setQuickMove(false);
    setSongCardApproachMove(false);
    setMoveDurationMs(null);
    setPortalMove(false);
    setSuppressMovementTransition(false);
    setSongCardOpen(false);
    setSongCardPinned(false);
    setSongCardSide(null);
    setMovementState(STORAGE_STATE.WANDERING);
    setPosition((current) => clampPoint(current));
  }, [clampPoint, clearActiveTarget, clearPortalTimers, enabled, location.pathname, shouldRender, startInitialEntry]);

  useEffect(() => {
    if (!shouldRender) {
      return undefined;
    }

    let safetyTimer;

    const nudgeIfBlocked = () => {
      if (songCardModeRef.current || songCardOpenRef.current) {
        return;
      }

      avoidRectsCacheRef.current = null;
      window.clearTimeout(safetyTimer);
      safetyTimer = window.setTimeout(() => {
        setPosition((currentPosition) => {
          const clampedPosition = clampPoint(currentPosition);

          if (isSafePausePoint(clampedPosition)) {
            return clampedPosition;
          }

          const nextPoint = findNearbySafePoint(clampedPosition);
          clearActiveTarget();
          setDirection(getFacingDirection(clampedPosition, nextPoint));
          setMovementState(STORAGE_STATE.WANDERING);
          return nextPoint;
        });
      }, 180);
    };

    window.addEventListener('resize', nudgeIfBlocked);

    return () => {
      window.clearTimeout(safetyTimer);
      window.removeEventListener('resize', nudgeIfBlocked);
    };
  }, [clampPoint, clearActiveTarget, findNearbySafePoint, getFacingDirection, isSafePausePoint, shouldRender, songCardOpen]);

  useEffect(() => {
    window.clearTimeout(timerRef.current);

    if (!shouldRender || prefersReducedMotion || songCardOpen) {
      return undefined;
    }

    const scheduleNextStep = () => {
      const delay = getRandomBetween(MOVEMENT.minDelay, MOVEMENT.maxDelay);
      timerRef.current = window.setTimeout(() => {
        takeStep();
        scheduleNextStep();
      }, delay);
    };

    scheduleNextStep();

    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, [prefersReducedMotion, shouldRender, songCardOpen, takeStep]);

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
      window.clearTimeout(scrollIdleTimerRef.current);
      window.clearTimeout(quickMoveTimerRef.current);
      window.clearTimeout(songCardApproachTimerRef.current);
      window.clearTimeout(attentionTimerRef.current);
      window.clearTimeout(noticeTimerRef.current);
      window.cancelAnimationFrame(noticeFrameRef.current);
      clearPortalTimers();
    };
  }, [clearPortalTimers]);

  if (!shouldRender) {
    return null;
  }

  const image = SPUD_IMAGES[direction];
  const shouldHideUntilEntryStarts = enabled &&
    !wasEnabledRef.current &&
    hasPlacedInitialPositionRef.current &&
    !portalMove;
  const reducedMotionPosition = clampPoint({
    x: viewport.width - spuddieSize.width - 28,
    y: window.scrollY + viewport.height - spuddieSize.height - 28,
  });
  const activePosition = prefersReducedMotion ? reducedMotionPosition : position;

  return (
    <div className={`wandering-spuddie-layer ${songCardOpen ? 'wandering-spuddie-layer--song-card' : ''} ${songCardPinned ? 'wandering-spuddie-layer--pinned' : ''}`}>
      <div
        ref={spuddieRef}
        className={`wandering-spuddie wandering-spuddie--${movementState} ${songCardOpen ? 'wandering-spuddie--reading' : ''} ${suppressMovementTransition ? 'wandering-spuddie--no-transition' : ''} ${quickMove ? 'wandering-spuddie--quick-move' : ''} ${songCardApproachMove ? 'wandering-spuddie--song-card-approach' : ''} ${attentionWiggle ? 'wandering-spuddie--attention' : ''} ${noticeWiggle ? 'wandering-spuddie--noticing' : ''}`}
        onClick={moveOnInteraction}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            moveOnInteraction();
          }
        }}
        role="button"
        tabIndex={songCardOpen ? -1 : 0}
        aria-label="Move Spuddie"
        style={{
          transform: `translate3d(${activePosition.x}px, ${activePosition.y}px, 0)`,
          '--spuddie-move-duration': moveDurationMs ? `${moveDurationMs}ms` : undefined,
          visibility: shouldHideUntilEntryStarts ? 'hidden' : undefined,
        }}
      >
        <span className="wandering-spuddie__hover-shell">
          <img className="wandering-spuddie__image" src={image.src} alt={image.alt} draggable="false" />
        </span>
      </div>
    </div>
  );
}

export default WanderingSpuddie;
