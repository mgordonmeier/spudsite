export function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rectsOverlap(a, b, buffer = 0) {
  return !(
    a.right < b.left - buffer ||
    a.left > b.right + buffer ||
    a.bottom < b.top - buffer ||
    a.top > b.bottom + buffer
  );
}

export function getDirection(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx >= 0 ? 'right' : 'left';
  }

  return dy >= 0 ? 'down' : 'up';
}

export function getViewportSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function rectToDocumentRect(rect) {
  return {
    left: rect.left + window.scrollX,
    right: rect.right + window.scrollX,
    top: rect.top + window.scrollY,
    bottom: rect.bottom + window.scrollY,
    width: rect.width,
    height: rect.height,
  };
}

export function isElementVisibleInViewport(element) {
  const rect = element.getBoundingClientRect();

  return rect.width > 0 &&
    rect.height > 0 &&
    rect.bottom > 0 &&
    rect.top < window.innerHeight &&
    rect.right > 0 &&
    rect.left < window.innerWidth;
}
