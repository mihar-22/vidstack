import { uppercaseFirstLetter } from '@vidstack/foundation';
import { derived, get, writable } from 'svelte/store';

export type JSLibType = 'html' | 'react' | 'svelte' | 'vue';

export const jsLib = writable<JSLibType>('html');

export const stripJSLibRE = /\/?docs\/player\/(react|svelte|vue)\/?/;
export const componentsRE = /\/components\//;
export const reactPathRE = /docs\/player\/react/;
export const sveltePathRE = /docs\/player\/svelte/;
export const vuePathRE = /docs\/player\/vue/;

export function stripJSLibFromPath(path: string) {
  return path.replace(stripJSLibRE, '/docs/player/');
}

export function addJSLibToPath(path: string, _lib: JSLibType = get(jsLib)) {
  const libPath = _lib !== 'html' ? `/${_lib}` : '';
  return stripJSLibFromPath(path).replace('/docs/player/', `/docs/player${libPath}/`);
}

export function titleCaseJSLib(lib: string) {
  if (lib === 'html') {
    return 'HTML';
  }

  return uppercaseFirstLetter(lib);
}

export const currentJSLibTitle = derived(jsLib, titleCaseJSLib);

export function getJSLibFromPath(path: string): JSLibType {
  if (reactPathRE.test(path)) {
    return 'react';
  } else if (sveltePathRE.test(path)) {
    return 'svelte';
  } else if (vuePathRE.test(path)) {
    return 'vue';
  }

  return 'html';
}
