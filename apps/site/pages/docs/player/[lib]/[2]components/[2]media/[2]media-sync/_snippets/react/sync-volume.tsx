import { Media, MediaSync } from '@vidstack/player-react';

export function MediaPlayer() {
  return (
    <Media>
      <MediaSync syncVolume>{/* ... */}</MediaSync>
    </Media>
  );
}
