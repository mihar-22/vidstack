import { Video } from '@vidstack/player-react';

function MediaPlayer() {
  return (
    <Video poster="https://media-files.vidstack.io/poster.png">
      <video preload="none">
        <source src="https://media-files.vidstack.io/720p.ogv" type="video/ogg" />
        <source src="https://media-files.vidstack.io/720p.avi" type="video/avi" />
        <source src="https://media-files.vidstack.io/720p.mp4" type="video/mp4" />
        Your browser doesn't support the HTML5 <code>video</code> tag.
      </video>
    </Video>
  );
}
