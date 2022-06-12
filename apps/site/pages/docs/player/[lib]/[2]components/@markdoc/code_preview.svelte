<script lang="ts">
  import clsx from 'clsx';
  import { ariaBool } from '@vidstack/foundation';

  import { jsLibExts } from '$src/stores/js-lib';
  import { intersectionObserver } from '$src/actions/intersection-observer';
  import IndeterminateLoading from '$src/components/base/IndeterminateLoading.svelte';
  import { codeSnippets } from '$src/stores/code-snippets';
  import { codePreviews } from '$src/stores/code-previews';

  import CodeSnippet from '../../../../@markdoc/code_snippet.svelte';

  export let name: string;
  export let copy = true;
  export let css = false;
  export let size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';

  $: snippetNames = [...$jsLibExts.map((ext) => `${name}${ext}`), css && `${name}.css`].filter(
    (name) => name && $codeSnippets.some((snippet) => snippet.name === name),
  );

  $: preview = $codePreviews.find((preview) => preview.name === name);

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
  class="code-preview flex flex-col rounded-md my-8 shadow-lg mx-auto overflow-hidden border border-gray-outline text-gray-300 prefers-dark-scheme"
  style="background-color: var(--code-fence-bg);"
  aria-busy={ariaBool(!hasLoaded)}
  use:intersectionObserver={{ callback: onIntersect }}
>
  <div
    class={clsx(
      'w-full flex items-center justify-center rounded-md rounded-b-none overflow-auto relative scroll-contain scrollbar',
      size === 'small' && 'h-48',
      size === 'medium' && 'h-72',
      size === 'large' && 'h-96',
      size === 'xlarge' && 'h-[450px]',
    )}
  >
    {#if !hasLoaded}
      <IndeterminateLoading />
    {/if}

    <div class="contents not-prose">
      <svelte:component this={component} />
    </div>
  </div>

  <div class="relative">
    <div
      class={clsx(
        'flex flex-row no-scrollbar not-prose border-t border-b border-gray-outline z-10',
        snippetNames.length === 1 && 'hidden',
      )}
    >
      <ul class={clsx('w-full list-none flex whitespace-nowrap')}>
        {#each snippetNames as name, i (name)}
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
              {name}
            </button>
          </li>
        {/each}
      </ul>
    </div>
    <div class={clsx('z-0', snippetNames.length === 1 && 'border-t border-gray-outline')}>
      {#each snippetNames as name, i (name)}
        <div class={clsx('code-snippet', i !== activeTab && 'hidden')}>
          <CodeSnippet nums {name} {copy} {...$$restProps} />
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
