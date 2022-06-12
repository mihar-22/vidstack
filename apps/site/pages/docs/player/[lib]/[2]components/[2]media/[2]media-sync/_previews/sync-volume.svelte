<script lang="ts">
  import { type MediaVolumeSyncEvent } from '@vidstack/player';
  import { Media, MediaSync, Video } from '@vidstack/player/svelte';

  function onMediaVolumeSync(event: MediaVolumeSyncEvent) {
    const { volume, muted } = event.detail;
    console.log(event);
    console.log(`Synced volume to ->`, volume);
    console.log(`Synced muted to ->`, muted);
  }
</script>

<div class="flex flex-col p-2">
  <div class="media flex flex-col items-center">
    <Media class="max-w-xs">
      <MediaSync syncVolume on:vds-media-volume-sync={onMediaVolumeSync}>
        <Video controls>
          <video controls preload="none" src="https://media-files.vidstack.io/360p.mp4">
            <track kind="captions" />
          </video>
        </Video>
      </MediaSync>
    </Media>

    <Media class="max-w-xs">
      <MediaSync syncVolume>
        <Video controls>
          <video controls preload="none" src="https://media-files.vidstack.io/360p.mp4">
            <track kind="captions" />
          </video>
        </Video>
      </MediaSync>
    </Media>
  </div>

  <p class="mt-4 text-center text-xs">
    Change the volume of one of the players and observe the volume on the other. Try muting them as
    well. Finally, open your console to see the <code>vds-media-volume-sync</code> event fire as you
    make any volume changes.
  </p>
</div>
