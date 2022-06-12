<script>
  import { Media, Hls, AspectRatio } from '@vidstack/player/svelte';
</script>

<Media class="w-11/12 max-w-lg mx-auto">
  <AspectRatio class="w-full" ratio="16/9">
    <Hls controls poster="https://media-files.vidstack.io/poster.png">
      <video
        controls
        preload="none"
        src="https://media-files.vidstack.io/hls/index.m3u8"
        poster="https://media-files.vidstack.io/poster-seo.png"
      >
        <track kind="captions" />
      </video>
    </Hls>
  </AspectRatio>
</Media>
