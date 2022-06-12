import { useRef } from 'React';

import hlsjs from 'hls.js';
import { type HlsElement } from '@vidstack/player';
import { Hls } from '@vidstack/player-react';

function Media() {
  const providerRef = useRef<HlsElement>(null);

  useEffect(() => {
    // `hls.js` instance.
    const engine = providerRef.current.hlsEngine;
  }, []);

  return <Hls ref={providerRef}>{/* ... */}</Hls>;
}
