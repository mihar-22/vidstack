import { createContext, createStore, useContext } from 'maverick.js';

import { ATTEMPTING_AUTOPLAY, CAN_LOAD_POSTER, MediaState } from './state';
import { createTimeRanges } from './time-ranges';

export interface MediaStore extends MediaState {}

export const mediaStore = createStore<MediaStore>({
  autoplay: false,
  autoplayError: undefined,
  buffered: createTimeRanges(),
  duration: 0,
  canLoad: false,
  canPlay: false,
  canFullscreen: false,
  controls: false,
  poster: '',
  currentTime: 0,
  ended: false,
  error: undefined,
  fullscreen: false,
  userIdle: false,
  loop: false,
  live: false,
  mediaType: 'unknown',
  muted: false,
  paused: true,
  played: createTimeRanges(),
  playing: false,
  playsinline: false,
  seekable: createTimeRanges(),
  seeking: false,
  source: { src: '' },
  sources: [],
  started: false,
  viewType: 'unknown',
  volume: 1,
  waiting: false,
  get bufferedAmount() {
    const buffered = this.buffered;
    return buffered.length === 0 ? 0 : buffered.end(buffered.length - 1);
  },
  get seekableAmount() {
    const seekable = this.seekable;
    return seekable.length === 0 ? 0 : seekable.end(seekable.length - 1);
  },
  [ATTEMPTING_AUTOPLAY]: false,
  [CAN_LOAD_POSTER]: true,
});

export const MediaStoreContext = createContext<MediaStore>(() => mediaStore.create());

export function useMediaStore(): Readonly<MediaStore> {
  return useContext(MediaStoreContext);
}

export function useInternalMediaStore() {
  return useContext(MediaStoreContext);
}

const DO_NOT_RESET_ON_SRC_CHANGE = new Set<keyof MediaStore>([
  'autoplay',
  'canFullscreen',
  'canLoad',
  'controls',
  'loop',
  'muted',
  'playsinline',
  'poster',
  'source',
  'sources',
  'viewType',
  'volume',
  CAN_LOAD_POSTER,
]);

/**
 * Resets all media state and leaves general player state intact (i.e., `autoplay`, `volume`, etc.).
 */
export function softResetMediaStore($media: MediaStore) {
  mediaStore.reset($media, (prop) => !DO_NOT_RESET_ON_SRC_CHANGE.has(prop));
}

export function hardResetMediaStore($media: MediaStore) {
  mediaStore.reset($media);
}
