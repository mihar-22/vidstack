import { HLSVideo, Media } from '@vidstack/react';
import HLS from 'hls.js';

function MediaPlayer() {
  return (
    <Media>
      <HLSVideo library={HLS}>{/* ... */}</HLSVideo>
    </Media>
  );
}
