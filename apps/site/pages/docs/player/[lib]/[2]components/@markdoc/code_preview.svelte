<script lang="ts">
  import { route } from '@vitebook/svelte';
  import { ariaBool } from '@vidstack/foundation';

  import { jsLib, stripJSLibFromPath, getJSLibFileExt } from '$src/stores/js-lib';

  import previews from ':virtual/code_previews';
  import CodeSnippet from '../../../../@markdoc/code_snippet.svelte';
  import clsx from 'clsx';
  import { intersectionObserver } from '$src/actions/intersection-observer';
  import IndeterminateLoading from '$src/components/base/IndeterminateLoading.svelte';

  export let name: string;
  export let copy = true;
  export let css = false;
  export let size: 'small' | 'medium' | 'large' = 'medium';

  $: jsExt = getJSLibFileExt($jsLib);

  $: snippets = [`${name}${jsExt}`, css && `${name}.css`].filter(Boolean) as string[];

  $: baseRoutePath = stripJSLibFromPath($route.url.pathname).replace('/docs/player/', '');

  $: preview = previews.find(
    (snippet) => snippet.name === name && baseRoutePath.startsWith(snippet.path),
  );

  let component;
  let activeTab = 0;
  let hasLoaded = false;
  let isVisible = false;

  $: if (isVisible) loadPreview(preview);

  async function loadPreview(preview) {
    if (!preview) return;
    hasLoaded = false;
    const mod = await preview?.loader();
    component = mod.default;
    hasLoaded = true;
  }

  const onIntersect: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      isVisible = true;
    }
  };
</script>

<div
  class="code-preview flex flex-col rounded-md shadow-lg mx-auto overflow-hidden border border-gray-outline text-gray-300 prefers-dark-scheme"
  style="color-scheme: dark; background-color: var(--code-fence-bg);"
  aria-busy={ariaBool(!hasLoaded)}
  use:intersectionObserver={{ callback: onIntersect }}
>
  <div
    class={clsx(
      'w-full flex items-center justify-center rounded-md rounded-b-none overflow-auto relative',
      size === 'small' && 'h-48',
      size === 'medium' && 'h-72',
      size === 'large' && 'h-96',
    )}
  >
    {#if !hasLoaded}
      <IndeterminateLoading />
    {/if}

    <svelte:component this={component} />
  </div>

  <div class="relative">
    <div
      class={clsx(
        'flex flex-row no-scrollbar not-prose border-t border-b border-gray-outline z-10',
        snippets.length === 1 && 'hidden',
      )}
    >
      <ul class={clsx('w-full list-none flex whitespace-nowrap')}>
        {#each snippets as snippet, i (snippet)}
          <li class="z-0 focus-within:z-10">
            <button
              class={clsx(
                'font-mono text-sm px-5 py-2',
                activeTab === i
                  ? 'border-brand border-b text-brand bg-gray-700'
                  : 'hover:text-white',
              )}
              on:click={() => {
                activeTab = i;
              }}
            >
              {snippet}
            </button>
          </li>
        {/each}
      </ul>
    </div>
    <div class={clsx('z-0', snippets.length === 1 && 'border-t border-gray-outline')}>
      {#each snippets as snippet, i (snippet)}
        <div class={clsx('code-snippet', i !== activeTab && 'hidden')}>
          <CodeSnippet nums name={snippet} {copy} {...$$restProps} />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .code-snippet :global(.code-fence) {
    @apply m-0;
  }

  .code-snippet :global(.code-fence) {
    @apply shadow-none border-0 rounded-tl-none rounded-tr-none;
  }
</style>
