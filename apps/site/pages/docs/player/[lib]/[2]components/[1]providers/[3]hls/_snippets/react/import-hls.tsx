import hlsjs from 'hls.js';
import { Hls } from '@vidstack/player-react';

function Media() {
  return <Hls hlsLibrary={hlsjs}>{/* ... */}</Hls>;
}
