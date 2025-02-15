import { Media } from '@vidstack/react';
import type { MediaLoadedMetadataEvent } from 'vidstack';

function MediaPlayer() {
  function onLoadedMetadata(event: MediaLoadedMetadataEvent) {
    // original media event (`loadedmetadata`) is still available.
    const originalMediaEvent = event.trigger;
  }

  return <Media onLoadedMetadata={onLoadedMetadata}>{/* ... */}</Media>;
}
