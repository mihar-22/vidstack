import { Hls } from '@vidstack/player-react';

function Media() {
  return <Hls hlsConfig={{ lowLatencyMode: true }}>{/* ... */}</Hls>;
}
