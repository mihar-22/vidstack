<script lang="ts" context="module">
  import { sortOrderedPageFiles, type ServerLoader } from '@vitebook/core';
  import type { SidebarLink, SidebarLinks } from '$src/layouts/sidebar/context';

  export const loader: ServerLoader = async () => {
    const { readDirDeepSync } = await import('$src/server/utils');

    const exclude = /\/_|@layout|@markdoc|\/api\.md$|quickstart\/[^index]|styling\/[^index]/;
    const stripRootPathRE = /^(.*?)\[lib\]\//;

    const files = readDirDeepSync('pages/docs/player/[lib]', exclude).map((file) =>
      file.replace(stripRootPathRE, ''),
    );

    const slugs = sortOrderedPageFiles(files).map((file) =>
      file.replace(/\/index\.md$/, '/').replace(/\.md$/, '.html'),
    );

    const sidebar: SidebarLinks = {
      'Getting Started': links(slugs, /^\/getting-started/),
      Providers: links(slugs, /^\/components\/providers/),
      Media: links(slugs, /^\/components\/media/),
      UI: links(slugs, /^\/components\/ui/),
    };

    function links(slugs: string[], include: RegExp): SidebarLink[] {
      return slugs
        .filter((slug) => include.test(slug))
        .map((slug) => ({
          title: kebabToTitleCase(
            noendslash(slug.replace(/\.html$/, ''))
              .split('/')
              .pop()!,
          ),
          slug: `/docs/player${slug}`,
        }));
    }

    return {
      data: { sidebar },
      cache: () => true,
    };
  };
</script>

<script lang="ts">
  import { readable } from 'svelte/store';
  import { noendslash } from '@vitebook/core';
  import { route } from '@vitebook/svelte';
  import { kebabToTitleCase } from '@vidstack/foundation';

  import DocsLayout from '$src/layouts/DocsLayout.svelte';
  import Algolia from '$src/components/algolia/Algolia.svelte';
  import { currentJSLibSidebar, getJSLibFromPath, jsLib } from '$src/stores/js-lib';
  import { installMethod, installMethods } from '$src/stores/install-method';
  import { mediaProvider, mediaProviders } from '$src/stores/media-provider';
  import { getSelectionFromPath } from '$src/utils/path';

  export let sidebar;

  const jsLibSidebar = currentJSLibSidebar(readable(sidebar));

  jsLib.set(getJSLibFromPath($route.url.pathname));
  installMethod.set(getSelectionFromPath(installMethods) ?? 'npm');
  mediaProvider.set(getSelectionFromPath(mediaProviders) ?? 'video');
</script>

<DocsLayout sidebar={jsLibSidebar}>
  <Algolia
    apiKey="03b81ed3b7849b33599967cec76734fe"
    appId="JV3QY1UI79"
    indexName="vidstack"
    slot="search"
  />

  <slot />
</DocsLayout>
