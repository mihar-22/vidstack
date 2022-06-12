import { Media, MediaSync, Video } from '@vidstack/player-react';

export function MediaPlayers() {
  return (
    <>
      <Media>
        <MediaSync>
          <Video></Video>
        </MediaSync>
      </Media>

      <Media>
        <MediaSync>
          <Video></Video>
        </MediaSync>
      </Media>
    </>
  );
}
