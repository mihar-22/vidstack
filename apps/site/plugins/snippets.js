import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { stripRouteMeta } from '@vessel-js/app/node';
import { globby } from 'globby';

const SNIPPETS_ID = ':virtual/code_snippets';
const SNIPPETS_REQ_ID = `/${SNIPPETS_ID}`;
const PREVIEWS_ID = ':virtual/code_previews';
const PREVIEWS_REQ_ID = `/${PREVIEWS_ID}`;

const snippetRE = /pages\/docs\/.*?_snippets/;
const previewRE = /pages\/docs\/.*?_previews/;
/**
 * @typedef {{
 *  filePath: string;
 *  lang: string;
 * }} Snippet
 */

/** @type {Map<string, Snippet>} */
export const snippetsMap = new Map();

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
    handleHotUpdate({ file, server }) {
      if (snippetRE.test(file)) {
        server.moduleGraph.invalidateModule(server.moduleGraph.getModuleById(SNIPPETS_REQ_ID));
      }

      if (previewRE.test(file)) {
        server.moduleGraph.invalidateModule(server.moduleGraph.getModuleById(PREVIEWS_REQ_ID));
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

      const pathname = stripRouteMeta(filePath)
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
  /** @type {{ name: string; path: string; lines: number; scrollX: number; loader: string; }[]} */
  let snippets = [];

  const files = await globby('pages/docs/player/[lib]/**/_snippets/**/*[^.md]');

  await Promise.all(
    files.map(async (filePath) => {
      const pathname = getSnippetPath(filePath);
      const content = await readFile(filePath, { encoding: 'utf-8' });

      const name = path.basename(filePath);
      const lines = content.split('\n');
      const ext = path.extname(filePath);
      const lang = ext.slice(1);

      const scrollX = Math.max(...lines.map((line) => line.length));

      const id = `:virtual/${filePath.replace(ext, '')}?lang=${lang}`;
      snippetsMap.set(id, { filePath, lang: lang });

      snippets.push({
        name,
        path: pathname,
        lines: lines.length - 1,
        scrollX,
        loader: `() => import('${id}')`,
      });
    }),
  );

  return snippets;
}

const stripBasePathRE = /^\/?pages\/docs\/player\/\[lib\]\//;
const stripSnippetsDirRE = /\/_snippets.*$/;

/**
 * @param {string} filePath
 */
export function getSnippetPath(filePath) {
  return stripRouteMeta(filePath).replace(stripBasePathRE, '').replace(stripSnippetsDirRE, '');
}

function slash(str) {
  str.replace(/^\/?/, '/');
}

const stripImportQuotesRE = /"\(\) => import\((.+)\)"/g;
function stripImportQuotesFromJson(json) {
  return json.replace(stripImportQuotesRE, `() => import($1)`);
}
