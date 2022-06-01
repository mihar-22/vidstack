import { kebabToTitleCase } from '@vidstack/foundation';
import { route } from '@vitebook/svelte';
import { derived } from 'svelte/store';

const elementNameRE = /\/components\/.*?\/(.*?)(\/|$)/;
export const elementTagName = derived(route, ($route) => {
  const path = $route.url.pathname;
  const name = path.match(elementNameRE)?.[1];
  return name ? `vds-${name}` : '';
});

/** Auto-generate in the future by using doc tags in `@vidstack/player`. */
export const EXPERIMENTAL_TAG_NAMES = new Set(['vds-media-visibility', 'vds-gesture']);

export const isElementExperimental = derived(elementTagName, ($tagName) =>
  EXPERIMENTAL_TAG_NAMES.has($tagName),
);

export const elementHeading = derived(
  elementTagName,
  ($elementTagName) =>
    `${formatElementHeading(kebabToTitleCase($elementTagName.replace('vds-', '')))}`,
);

function formatElementHeading(name: string) {
  if (name === 'Hls') return 'HLS';
  if (name === 'Youtube') return 'YouTube';
  return name;
}
