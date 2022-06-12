<script>
  import { Media, Video, AspectRatio } from '@vidstack/player/svelte';
</script>

<Media class="w-11/12 max-w-lg mx-auto">
  <AspectRatio class="w-full" ratio="16/9">
    <Video controls poster="https://media-files.vidstack.io/poster.png">
      <video
        controls
        preload="none"
        src="https://media-files.vidstack.io/720p.mp4"
        poster="https://media-files.vidstack.io/poster-seo.png"
      >
        <track kind="captions" />
      </video>
    </Video>
  </AspectRatio>
</Media>
