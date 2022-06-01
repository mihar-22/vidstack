<script lang="ts" context="module">
  // import { EXPERIMENTAL_TAG_NAMES } from './element';
  // import ExperimentalIcon from '~icons/ri/test-tube-fill';

  // export function load({ pathname }) {
  // TODO: load sidebar
  // cache based on js lib pathname
  // }

  // export const currentJSLibSidebar = (links: Readable<SidebarLinks>) =>
  // derived([jsLib, links], ([$lib, $links]) => {
  //   const links: SidebarLinks = { ...$links };

  //   for (const item of Object.values(links).flat()) {
  //     item.slug = addJSLibToPath(item.slug, $lib);

  //     if (componentsRE.test(item.slug)) {
  //       const tagName = `vds-${item.title.replace(/\s/g, '-').toLowerCase()}`;
  //       if (EXPERIMENTAL_TAG_NAMES.has(tagName)) {
  //         item.icon = { after: ExperimentalIcon };
  //       }
  //     }
  //   }

  //   return links;
  // });
</script>

<script>
  import DocsLayout from '$src/layouts/DocsLayout.svelte';
  import Algolia from '$src/components/algolia/Algolia.svelte';
  import { jsLib } from '$src/stores/jsLib';

  export let sidebar = {};
</script>

<svelte:head>
  <meta name="docsearch:jslib" content={$jsLib} />
  <meta name="docsearch:version" content="latest" />
</svelte:head>

<DocsLayout {sidebar}>
  <Algolia
    apiKey="03b81ed3b7849b33599967cec76734fe"
    appId="JV3QY1UI79"
    indexName="vidstack"
    slot="search"
  />

  <slot />
</DocsLayout>
