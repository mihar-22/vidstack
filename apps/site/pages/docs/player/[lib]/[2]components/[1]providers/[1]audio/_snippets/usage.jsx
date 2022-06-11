import { Audio } from '@vidstack/player-react';

function Media() {
  return (
    <Audio controls>
      <audio controls preload="none" src="https://media-files.vidstack.io/audio.mp3" />
    </Audio>
  );
}
