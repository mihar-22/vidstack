import { Media, MediaSync } from '@vidstack/player-react';

export function MediaPlayer() {
  return (
    <Media>
      <MediaSync syncVolume volumeStorageKey="my-storage-key">
        {/* ... */}
      </MediaSync>
    </Media>
  );
}
