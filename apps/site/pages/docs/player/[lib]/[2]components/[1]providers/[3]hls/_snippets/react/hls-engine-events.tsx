import { type HlsInstanceEvent, type HlsDestroyingEvent } from '@vidstack/player';
import { Hls } from '@vidstack/player-react';

function Media() {
  function onInstance(event: HlsInstanceEvent) {
    // `hls.js` instance.
    const hls = event.detail;
  }

  function onDestroy(event: HlsDestroyingEvent) {
    // ...
  }

  return (
    <Hls onHlsInstance={onInstance} onHlsDestroying={onDestroy}>
      {/* ... */}
    </Hls>
  );
}
