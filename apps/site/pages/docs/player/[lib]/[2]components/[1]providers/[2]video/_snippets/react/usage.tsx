import { Video } from '@vidstack/player-react';

function Media() {
  return (
    <Video poster="https://media-files.vidstack.io/poster.png">
      <video
        controls
        preload="none"
        src="https://media-files.vidstack.io/720p.mp4"
        poster="https://media-files.vidstack.io/poster-seo.png"
      />
    </Video>
  );
}
