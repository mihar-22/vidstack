import { Media, MediaVisibility, Video } from '@vidstack/player-react';

export function MediaPlayer() {
  return (
    <Media>
      <MediaVisibility>
        {/* Does not have to be a direct child. */}
        <Video>{/* ... */}</Video>
      </MediaVisibility>
    </Media>
  );
}
