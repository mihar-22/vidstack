import { isFunction, isUndefined } from 'maverick.js/std';

export const UA = __SERVER__ ? '' : navigator?.userAgent.toLowerCase();
export const IS_IOS = !__SERVER__ && /iphone|ipad|ipod|ios|CriOS|FxiOS/.test(UA);
export const IS_IPHONE = !__SERVER__ && /(iPhone|iPod)/gi.test(navigator?.platform);
export const IS_CHROME = !__SERVER__ && !!window.chrome;
export const IS_SAFARI = !__SERVER__ && (window.safari || /(apple|safari)/.test(UA));

/**
 * Returns the current version of Safari. Defaults to `0` if unknown.
 */
export function currentSafariVersion(): number {
  return __SERVER__ ? 0 : Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]);
}

/**
 * Checks if a video player can enter fullscreen.
 *
 * @see {@link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1633500-webkitenterfullscreen}
 */
export function canFullscreenVideo(): boolean {
  if (__SERVER__) return false;
  const video = document.createElement('video');
  return isFunction(video.webkitEnterFullscreen);
}

/**
 * Checks whether the `IntersectionObserver` API is available.
 */
export function canObserveIntersection(): boolean {
  return !__SERVER__ && !isUndefined(window.IntersectionObserver);
}

/**
 * Checks if the ScreenOrientation API is available.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
 */
export function canOrientScreen(): boolean {
  return (
    !__SERVER__ &&
    !isUndefined(screen.orientation) &&
    isFunction(screen.orientation.lock) &&
    isFunction(screen.orientation.unlock)
  );
}

/**
 * Checks if the screen orientation can be changed.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
 */
export function canRotateScreen(): boolean {
  return (
    !__SERVER__ &&
    !isUndefined(window.screen.orientation) &&
    !isUndefined(window.screen.orientation.lock)
  );
}

/**
 * Reduced motion iOS & MacOS setting.
 *
 * @see {@link https://webkit.org/blog/7551/responsive-design-for-motion/}
 */
export function isReducedMotionPreferred(): boolean {
  return (
    !__SERVER__ && 'matchMedia' in window && window.matchMedia('(prefers-reduced-motion)').matches
  );
}

/**
 * Checks if the native HTML5 video player can play HLS.
 */
export function canPlayHLSNatively(): boolean {
  if (__SERVER__) return false;
  const video = document.createElement('video');
  return video.canPlayType('application/vnd.apple.mpegurl').length > 0;
}

/**
 * Checks if the native HTML5 video player can enter picture-in-picture (PIP) mode when using
 * the Chrome browser.
 *
 * @see {@link https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture}
 */
export function canUsePiPInChrome(): boolean {
  if (__SERVER__) return false;
  const video = document.createElement('video');
  return !!document.pictureInPictureEnabled && !video.disablePictureInPicture;
}

/**
 * Checks if the native HTML5 video player can enter picture-in-picture (PIP) mode when using
 * the desktop Safari browser, iOS Safari appears to "support" PiP through the check, however PiP
 * does not function.
 *
 * @see {@link https://developer.apple.com/documentation/webkitjs/adding_picture_in_picture_to_your_safari_media_controls}
 */
export function canUsePiPInSafari(): boolean {
  if (__SERVER__) return false;

  const video = document.createElement('video');

  return (
    isFunction(video.webkitSupportsPresentationMode) &&
    isFunction(video.webkitSetPresentationMode) &&
    !IS_IPHONE
  );
}

/**
 * Checks if the native HTML5 video player can enter PIP.
 */
export function canUsePiP(): boolean {
  return canUsePiPInChrome() || canUsePiPInSafari();
}

/**
 * @see {@link https://github.com/video-dev/hls.js/blob/master/src/is-supported.ts}
 */
export function getMediaSource(): typeof MediaSource | undefined {
  return __SERVER__ ? undefined : window?.MediaSource ?? window?.WebKitMediaSource;
}

/**
 * @see {@link https://github.com/video-dev/hls.js/blob/master/src/is-supported.ts}
 */
export function getSourceBuffer(): typeof SourceBuffer | undefined {
  return __SERVER__ ? undefined : window?.SourceBuffer ?? window?.WebKitSourceBuffer;
}

/**
 * Whether `hls.js` is supported in this environment.
 *
 * @see {@link https://github.com/video-dev/hls.js/blob/master/src/is-supported.ts}
 */
export function isHLSSupported(): boolean {
  if (__SERVER__) return false;

  const mediaSource = getMediaSource();

  if (isUndefined(mediaSource)) return false;

  const isTypeSupported =
    mediaSource &&
    isFunction(mediaSource.isTypeSupported) &&
    mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

  const sourceBuffer = getSourceBuffer();

  // If SourceBuffer is exposed ensure its API is valid because safari and old versions of Chrome
  // do not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible.
  const isSourceBufferValid =
    isUndefined(sourceBuffer) ||
    (!isUndefined(sourceBuffer.prototype) &&
      isFunction(sourceBuffer.prototype.appendBuffer) &&
      isFunction(sourceBuffer.prototype.remove));

  return !!isTypeSupported && !!isSourceBufferValid;
}
