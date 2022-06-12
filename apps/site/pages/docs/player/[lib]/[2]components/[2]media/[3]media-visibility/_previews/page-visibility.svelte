<script lang="ts">
  import { type MediaVisibilityChangeEvent } from '@vidstack/player';
  import { Media, MediaVisibility, Video } from '@vidstack/player/svelte';

  function onMediaVisibilityChange(event: MediaVisibilityChangeEvent) {
    const { page } = event.detail;
    console.log(event);
    console.log('Page state ->', page);
  }
</script>

<div class="flex flex-col w-full items-center">
  <Media class="w-11/12 max-w-lg mt-8">
    <MediaVisibility
      enterPage="play"
      exitPage="pause"
      pageEnterDelay={0}
      on:vds-media-visibility-change={onMediaVisibilityChange}
    >
      <Video controls autoplay muted volume={0.2}>
        <video controls preload="none" src="https://media-files.vidstack.io/360p.mp4">
          <track kind="captions" />
        </video>
      </Video>
    </MediaVisibility>
  </Media>

  <p class="text-sm mt-4 text-center px-2">
    Unmute the video and try going to another tab, minimizing the window or alt-tabbing to another
    application. Observe the sound stops as media playback is paused.
  </p>
</div>
