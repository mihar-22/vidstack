import { slash, stripImportQuotesFromJson, stripPageOrderFromPath } from '@vitebook/core/node';
import { readFile } from 'fs/promises';
import { globby } from 'globby';
import path from 'path';

const SNIPPETS_ID = ':virtual/code_snippets';
const SNIPPETS_REQ_ID = `/${SNIPPETS_ID}`;
const PREVIEWS_ID = ':virtual/code_previews';
const PREVIEWS_REQ_ID = `/${PREVIEWS_ID}`;

/** @returns {import('vite').Plugin}  */
export default () => {
  return {
    name: '@vidstack/snippets',
    enforce: 'pre',
    config() {
      return {
        resolve: {
          alias: {
            [SNIPPETS_ID]: SNIPPETS_REQ_ID,
            [PREVIEWS_ID]: PREVIEWS_REQ_ID,
          },
        },
      };
    },
    resolveId(id) {
      if (id === SNIPPETS_REQ_ID) return id;
      if (id === PREVIEWS_REQ_ID) return id;
    },
    async load(id) {
      if (id === SNIPPETS_REQ_ID) {
        const json = JSON.stringify(await getSnippets(), null, 2);
        return `export default ${stripImportQuotesFromJson(json)}`;
      }

      if (id === PREVIEWS_REQ_ID) {
        const json = JSON.stringify(await getPreviews(), null, 2);
        return `export default ${stripImportQuotesFromJson(json)}`;
      }
    },
  };
};

async function getPreviews() {
  /** @type {{ name: string; path: string; loader: string; }[]} */
  const previews = [];

  const stripBasePathRE = /^\/?pages\/docs\/player\/.*?\//;
  const stripSnippetsDirRE = /\/_previews.*$/;

  const files = await globby('pages/docs/player/[lib]/**/_previews/**/*.svelte');

  await Promise.all(
    files.map(async (filePath) => {
      const name = path.basename(filePath, '.svelte');

      const pathname = stripPageOrderFromPath(filePath)
        .replace(stripBasePathRE, '')
        .replace(stripSnippetsDirRE, '')
        .replace('/[lib]/', '');

      previews.push({
        name,
        path: pathname,
        loader: `() => import('${slash(filePath)}')`,
      });
    }),
  );

  return previews;
}

async function getSnippets() {
  /** @type {{ name: string; path: string; lines: number; loader: string; }[]} */
  let snippets = [];

  const stripBasePathRE = /^\/?pages\/docs\/player\/\[lib\]\//;
  const stripSnippetsDirRE = /\/_snippets.*$/;

  const files = await globby('pages/docs/player/[lib]/**/_snippets/**/*[^.md]');

  await Promise.all(
    files.map(async (filePath) => {
      const pathname = stripPageOrderFromPath(filePath)
        .replace(stripBasePathRE, '')
        .replace(stripSnippetsDirRE, '');

      const file = await readFile(filePath, { encoding: 'utf-8' });

      const name = path.basename(filePath);
      const lines = file.split('\n').length - 1;

      snippets.push({
        name,
        path: pathname,
        lines,
        loader: `() => import('${slash(filePath)}?highlight')`,
      });
    }),
  );

  return snippets;
}
