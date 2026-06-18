export const SPUDDIE_EVENTS = {
  SONG_CARD_OPEN: 'spuddie:song-card-open',
  SONG_CARD_CLOSE: 'spuddie:song-card-close',
  SONG_SYMBOL_CLICK: 'spuddie:song-symbol-click',
};

export function dispatchSpuddieSongCardOpen({ songName, rect }) {
  window.dispatchEvent(new CustomEvent(SPUDDIE_EVENTS.SONG_CARD_OPEN, {
    detail: { songName, rect },
  }));
}

export function dispatchSpuddieSongCardClose({ songName }) {
  window.dispatchEvent(new CustomEvent(SPUDDIE_EVENTS.SONG_CARD_CLOSE, {
    detail: { songName },
  }));
}

export function dispatchSpuddieSongSymbolClick({ songName, targetId }) {
  window.dispatchEvent(new CustomEvent(SPUDDIE_EVENTS.SONG_SYMBOL_CLICK, {
    detail: { songName, targetId },
  }));
}
