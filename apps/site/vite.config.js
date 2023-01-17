import { svelte as Svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from '@vitebook/core/node';
import VitebookSvelte from '@vitebook/svelte/node';
import { transform as esbuildTransform } from 'esbuild';
import Icons from 'unplugin-icons/vite';

import ComponentApi from './plugins/component-api.js';
import Highlight from './plugins/highlight.js';
import Snippets from './plugins/snippets.js';

export default defineConfig({
  vitebook: {
    markdown: {
      highlighter: 'shiki',
      shiki: {
        theme: 'material-ocean',
      },
    },
    routes: {
      entries: [
        ...['/', '/audio.html', '/hls.html'].map(
          (path) => `/docs/player/getting-started/quickstart${path}`,
        ),
        ...['/', '/audio.html', '/hls.html'].map(
          (path) => `/docs/player/getting-started/quickstart/cdn${path}`,
        ),
      ],
      matchers: {
        lib: /(vue|react|svelte)?/,
      },
    },
    sitemap: [
      {
        baseUrl: 'https://vidstack.io',
        filename: 'sitemap.xml',
        exclude: /docs\/player\/(vue|react|svelte)/,
      },
      {
        baseUrl: 'https://vidstack.io',
        filename: 'sitemap-search.xml',
      },
    ],
    plugins: [
      Highlight(),
      Snippets(),
      ComponentApi(),
      Icons({ compiler: 'svelte' }),
      VitebookSvelte(),
      Svelte({
        preprocess: [typescriptPreprocessor()],
      }),
    ],
  },
});

/**
 * @returns {import('svelte/types/compiler/preprocess').PreprocessorGroup}
 */
function typescriptPreprocessor() {
  const typescriptRE = /^(ts|typescript)($||\/)/;
  return {
    async script({ filename, attributes, content }) {
      const isTypescript =
        typeof attributes.lang === 'string' && typescriptRE.test(attributes.lang);

      if (isTypescript) {
        return esbuildTransform(content, {
          sourcefile: filename,
          charset: 'utf8',
          loader: 'ts',
          format: 'esm',
          minify: false,
          target: 'esnext',
          tsconfigRaw: {
            compilerOptions: {
              importsNotUsedAsValues: 'preserve',
              preserveValueImports: true,
            },
          },
        });
      }
    },
  };
}
