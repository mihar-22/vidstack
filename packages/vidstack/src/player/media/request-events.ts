import type { DOMEvent } from 'maverick.js/std';

export interface MediaRequestEvents {
  'media-start-loading': MediaStartLoadingRequestEvent;
  'media-mute-request': MediaMuteRequestEvent;
  'media-unmute-request': MediaUnmuteRequestEvent;
  'media-enter-fullscreen-request': MediaEnterFullscreenRequestEvent;
  'media-exit-fullscreen-request': MediaExitFullscreenRequestEvent;
  'media-play-request': MediaPlayRequestEvent;
  'media-pause-request': MediaPauseRequestEvent;
  'media-seek-request': MediaSeekRequestEvent;
  'media-seeking-request': MediaSeekingRequestEvent;
  'media-volume-change-request': MediaVolumeChangeRequestEvent;
  'media-resume-user-idle-request': MediaResumeUserIdleRequestEvent;
  'media-pause-user-idle-request': MediaPauseUserIdleRequestEvent;
  'media-show-poster-request': MediaShowPosterRequestEvent;
  'media-hide-poster-request': MediaHidePosterRequestEvent;
  'media-loop-request': MediaLoopRequestEvent;
}

/**
 * Fired when requesting media to begin loading. This will only take effect if the `loading`
 * strategy on the provider is set to `custom`.
 *
 * @bubbles
 * @composed
 */
export interface MediaStartLoadingRequestEvent extends DOMEvent<void> {}

/**
 * Fired when requesting the media to be muted.
 *
 * @bubbles
 * @composed
 */
export interface MediaMuteRequestEvent extends DOMEvent<void> {}

/**
 * Fired when requesting the media to be unmuted.
 *
 * @bubbles
 * @composed
 */
export interface MediaUnmuteRequestEvent extends DOMEvent<void> {}

/**
 * Whether to request fullscreen on the media (i.e., `<vds-media>`) or provider element
 * (e.g., `<vds-video>`). The `prefer-media` option will first see if the native fullscreen API is
 * available, if not it'll try the media provider.
 */
export type MediaFullscreenRequestTarget = 'prefer-media' | 'media' | 'provider';

/**
 * Fired when requesting media to enter fullscreen. The event `detail` can specify the
 * fullscreen target, which can be the media or provider element (defaults to `prefer-media`).
 *
 * @bubbles
 * @composed
 */
export interface MediaEnterFullscreenRequestEvent extends DOMEvent<MediaFullscreenRequestTarget> {}

/**
 * Fired when requesting media to exit fullscreen. The event `detail` can specify the fullscreen
 * target, which can be the media or provider element (defaults to `prefer-media`).
 *
 * @bubbles
 * @composed
 */
export interface MediaExitFullscreenRequestEvent extends DOMEvent<MediaFullscreenRequestTarget> {}

/**
 * Fired when requesting media playback to begin/resume.
 *
 * @bubbles
 * @composed
 */
export interface MediaPlayRequestEvent extends DOMEvent<void> {}

/**
 * Fired when requesting media playback to temporarily stop.
 *
 * @bubbles
 * @composed
 */
export interface MediaPauseRequestEvent extends DOMEvent<void> {}

/**
 * Fired when requesting a time change. In other words, moving the playhead to a new position.
 *
 * @bubbles
 * @composed
 */
export interface MediaSeekRequestEvent extends DOMEvent<number> {}

/**
 * Fired when seeking/scrubbing to a new playback position.
 *
 * @bubbles
 * @composed
 */
export interface MediaSeekingRequestEvent extends DOMEvent<number> {}

/**
 * Fired when requesting the media volume to be set to a new level.
 *
 * @bubbles
 * @composed
 */
export interface MediaVolumeChangeRequestEvent extends DOMEvent<number> {}

/**
 * Fired when user idle state tracking may resume. This is typically called after requesting
 * the idle state to pause via `vds-pause-user-idle-request`.
 *
 * @bubbles
 * @composed
 */
export interface MediaResumeUserIdleRequestEvent extends DOMEvent<void> {}

/**
 * Fired when user idle state tracking should pause. This is typically used when a control
 * is being actively interacted with, and we don't want the `idle` state changing until
 * the interaction is complete (eg: scrubbing, or settings is open).
 *
 * @bubbles
 * @composed
 */
export interface MediaPauseUserIdleRequestEvent extends DOMEvent<void> {}

/**
 * Fired when requesting the poster _should_ be rendered by the media provider element. This
 * should be fired if a custom poster element is _not_ being used.
 *
 * @bubbles
 * @composed
 */
export interface MediaShowPosterRequestEvent extends DOMEvent<void> {}

/**
 * Fired when requesting the poster should _not_ be rendered by the media provider element. This
 * should be fired if a custom poster element is being used (eg: `vds-poster`).
 *
 * @bubbles
 * @composed
 */
export interface MediaHidePosterRequestEvent extends DOMEvent<void> {}

/**
 * Internal event that is fired by a media provider when requesting media playback to restart after
 * reaching the end. This event also helps notify the media controller that media will be looping.
 *
 * @bubbles
 * @composed
 */
export interface MediaLoopRequestEvent extends DOMEvent<void> {}
