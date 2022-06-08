<script lang="ts">
  import { route } from '@vitebook/svelte';
  import { uppercaseFirstLetter } from '@vidstack/foundation';

  import { env } from '$src/env';
  import { isDarkColorScheme } from '$src/stores/color-scheme';
  import { jsLib, stripJSLibFromPath } from '$src/stores/js-lib';

  import Stackblitz from './stackblitz.svelte';

  export let name: string;
  export let css = false;
  export let title = `${uppercaseFirstLetter(name.replace(/-/g, ' '))} example`;

  function getExt(lib) {
    switch (lib) {
      case 'react':
        return '.tsx';
      // case 'vue':
      //   return '.vue';
      // case 'svelte':
      //   return '.svelte';
      default:
        return '.html';
    }
  }

  $: project = `github/vidstack/vidstack/tree/main/apps/site/examples`;
  $: ext = getExt($jsLib);
  $: path = stripJSLibFromPath($route.url.pathname).replace(/^\/?docs\//, '');
  $: theme = `theme=${!$isDarkColorScheme ? 'light' : 'dark'}`;
  $: initialPath = `/${path}/${name}_${ext.replace(/^\./, '')}?${theme}`;
  $: markupFile = `/src/${path}/${name}${ext}`;
  $: cssFile = css || path.includes('/components/ui') ? `/src/${path}/${name}.css` : null;
  $: files = [cssFile, markupFile].filter(Boolean) as string[];
  $: src = env.dev ? `http://localhost:4001${initialPath}` : null;
</script>

<Stackblitz
  {src}
  {title}
  {project}
  {initialPath}
  file={files}
  view="preview"
  hideNavigation
  hideDevTools
  hideExplorer
/>
