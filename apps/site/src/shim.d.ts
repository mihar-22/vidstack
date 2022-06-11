/// <reference types="vite/client" />
/// <reference types="@vitebook/core/globals" />
/// <reference types="@vitebook/svelte/globals" />
/// <reference types="unplugin-icons/types/svelte" />

declare module '*?highlight' {
  const lang: string;
  const code: string;
  const highlightedCode: string;
  export { code, highlightedCode, tokens };
}

declare module ':virtual/code_snippets' {
  export type CodeSnippet = {
    name: string;
    lines: number;
    path: string;
    loader: () => Promise<{ lang: string; code: string; highlightedCode: string }>;
  };

  const snippets: CodeSnippet[];
  export default snippets;
}

declare module ':virtual/code_previews' {
  export type CodePreview = {
    name: string;
    path: string;
    loader: () => Promise<{ default: typeof import('svelte').SvelteComponent }>;
  };

  const previews: CodePreview[];
  export default previews;
}
