import { Media, MediaSync } from '@vidstack/player-react';

export function MediaPlayer() {
  return (
    <Media>
      <MediaSync singlePlayback>{/* ... */}</MediaSync>
    </Media>
  );
}
