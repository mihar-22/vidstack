import { type HlsManifestLoadedEvent } from '@vidstack/player';
import { Hls } from '@vidstack/player-react';

function Media() {
  function onManifestLoaded(event: HlsManifestLoaded) {
    // ...
  }

  return <Hls onHlsManifestLoaded={onManifestLoaded}>{/* ... */}</Hls>;
}
