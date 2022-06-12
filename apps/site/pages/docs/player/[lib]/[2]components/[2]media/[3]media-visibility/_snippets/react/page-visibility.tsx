import { Media, MediaVisibility } from '@vidstack/player-react';

export function MediaPlayer() {
  return (
    <Media>
      <MediaVisibility enterPage="play" exitPage="pause" pageEnterDelay="0" pageChangeType="state">
        {/* ... */}
      </MediaVisibility>
    </Media>
  );
}
