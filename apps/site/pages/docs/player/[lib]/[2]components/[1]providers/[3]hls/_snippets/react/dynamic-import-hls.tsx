import { Hls } from '@vidstack/player-react';

function Media() {
  return <Hls hlsLibrary={() => import('hls.js')}>{/* ... */}</Hls>;
}
