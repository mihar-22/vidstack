import { Media, MediaSync } from '@vidstack/player/react';

function MediaPlayer() {
  return (
    <Media>
      <MediaSync syncVolume volumeStorageKey="my-storage-key">
        {/* ... */}
      </MediaSync>
    </Media>
  );
}
