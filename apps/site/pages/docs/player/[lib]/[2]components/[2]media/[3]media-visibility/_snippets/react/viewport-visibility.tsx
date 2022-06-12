import { Media, MediaVisibility } from '@vidstack/player-react';

export function MediaPlayer() {
  return (
    <Media>
      <MediaVisibility
        enterViewport="play"
        exitViewport="pause"
        intersectionThreshold="1"
        viewportEnterDelay="0"
      >
        {/* ... */}
      </MediaVisibility>
    </Media>
  );
}
