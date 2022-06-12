<script>
  import { Media, MediaSync, Video } from '@vidstack/player/svelte';
</script>

<div class="flex flex-col p-2">
  <div class="media flex flex-col items-center">
    <Media class="max-w-xs">
      <MediaSync singlePlayback>
        <Video controls>
          <video controls preload="none" src="https://media-files.vidstack.io/360p.mp4">
            <track kind="captions" />
          </video>
        </Video>
      </MediaSync>
    </Media>

    <Media class="max-w-xs">
      <MediaSync singlePlayback>
        <Video controls>
          <video controls preload="none" src="https://media-files.vidstack.io/360p.mp4">
            <track kind="captions" />
          </video>
        </Video>
      </MediaSync>
    </Media>
  </div>

  <p class="mt-4 text-center text-xs">
    Press play on any video and then trying playing the other one.
  </p>
</div>
