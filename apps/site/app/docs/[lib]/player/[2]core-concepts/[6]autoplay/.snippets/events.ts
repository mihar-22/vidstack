import { type MediaAutoplayEvent, type MediaAutoplayFailEvent } from 'vidstack';

const media = document.querySelector('vds-media');

media.addEventListener('autoplay', (event: MediaAutoplayEvent) => {
  // autoplay has successfully started.
});

media.addEventListener('autoplay-fail', (event: MediaAutoplayFailEvent) => {
  // autoplay has failed.
  console.log(event.detail.muted); // was media muted?
  console.log(event.detail.error); // media error
});
