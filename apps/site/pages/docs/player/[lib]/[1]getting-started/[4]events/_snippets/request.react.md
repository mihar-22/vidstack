```jsx
import { type PlayRequestEvent, type MediaPlayEvent } from '@vidstack/player';
import { Media, Video } from '@vidstack/player-react';

function Example() {
  // 1. request is made.
  function onPlayRequest(event: PlayRequestEvent) {
    console.log('play request was made.');
  }

  // 2. request is satisfied.
  function onPlay(event: MediaPlayEvent) {
    // request events are attached to media events.
    const playRequestEvent = event.requestEvent;
    console.log('play request was satisfied.');
  }

  return (
    <Media onPlayRequest={onPlayRequest}>
      <Video onPlay={onPlay}>{/* ... */}</Video>
    </Media>
  );
}
```
