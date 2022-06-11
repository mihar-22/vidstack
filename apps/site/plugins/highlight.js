import { noslash, slash } from '@vitebook/core/node';
import { readFile } from 'fs/promises';
import path from 'path';
import { getHighlighter, renderToHtml } from 'shiki';

/**
 * @param {import('shiki').HighlighterOptions} options
 * @returns {import('vite').Plugin}
 */
export default (options = {}) => {
  /** @type {import('shiki').Highlighter} */
  let shiki;

  const queryRE = /\?highlight.*/;
  const resolvedIdRE = /\?highlight&lang/;

  const theme =
    (typeof options.theme === 'string' ? options.theme : options.theme?.name) ??
    'material-palenight';

  return {
    name: '@vidstack/highlight',
    enforce: 'pre',
    async configResolved() {
      shiki = await getHighlighter({
        theme: 'material-palenight',
        langs: [],
        ...options,
      });
    },
    resolveId(id, importer) {
      if (resolvedIdRE.test(id)) {
        return id;
      }

      // We have to resolve a new ID to prevent any Vite plugins trying to transform these files.
      if (queryRE.test(id)) {
        const cleanedId = id.replace(queryRE, ' ');
        const ext = path.extname(cleanedId);
        const lang = ext.slice(1);
        const resolvedId = path.resolve(path.dirname(importer), cleanedId).replace(ext, '');
        return { id: `${slash(resolvedId)}?highlight&lang=${lang}` };
      }
    },
    async load(id) {
      if (!queryRE.test(id)) {
        return null;
      }

      const cleanId = noslash(id.replace(queryRE, ''));
      const lang = new URLSearchParams(id).get('lang').replace(/\s$/, '');
      const code = await readFile(`${cleanId}.${lang}`, { encoding: 'utf-8' });
      const tokens = shiki.codeToThemedTokens(code, lang);

      const html = renderToHtml(tokens, {
        fg: shiki.getForegroundColor(theme),
        // bg: shiki.getBackgroundColor(theme),
      })
        .replace(/^<pre(.*?)>/, '')
        .replace(/<\/pre(.*?)>$/, '')
        .trim();

      return `
        export const lang = "${lang}";
				export const code = ${JSON.stringify(code)}
				export const highlightedCode = ${JSON.stringify(html)}
			`;
    },
  };
};
