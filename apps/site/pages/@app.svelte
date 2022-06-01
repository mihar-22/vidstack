<script context="module">
  import { createSvelteViewRenderer } from '@vitebook/svelte';

  /** @type {import('@vitebook/core').ConfigureApp} */
  export function configureApp({ renderers }) {
    renderers.push(createSvelteViewRenderer());
  }
</script>

<script>
  import '$src/styles/fonts.css';
  import '$src/styles/app.css';
  import '$src/styles/tailwind.css';
  import '$src/polyfills/focus-visible';

  import { PageLayouts, PageView } from '@vitebook/svelte';
</script>

<PageLayouts>
  <PageView />
</PageLayouts>
