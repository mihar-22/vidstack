import { route } from '@vitebook/svelte';
import { derived } from 'svelte/store';

export const isComponentsPath = derived(route, ($route) =>
  /\/components\/?/.test($route.url.pathname),
);

export const isApiPath = derived(route, ($route) => /\/api\/?/.test($route.url.pathname));
