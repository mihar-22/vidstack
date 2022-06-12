import { Hls } from '@vidstack/player-react';

function Media() {
  return (
    <Hls poster="https://media-files.vidstack.io/poster.png">
      <video
        controls
        preload="none"
        src="https://media-files.vidstack.io/hls/index.m3u8"
        poster="https://media-files.vidstack.io/poster-seo.png"
      ></video>
    </Hls>
  );
}
