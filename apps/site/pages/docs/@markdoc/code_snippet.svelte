<script lang="ts">
  import { route } from '@vitebook/svelte';
  import { ariaBool } from '@vidstack/foundation';

  import { getJSLibFileExt, jsLib, stripJSLibFromPath } from '$src/stores/js-lib';
  import { intersectionObserver } from '$src/actions/intersection-observer';

  import snippets from ':virtual/code_snippets';
  import CodeFence from './@nodes/fence.svelte';
  import IndeterminateLoading from '$src/components/base/IndeterminateLoading.svelte';

  export let name: string;
  export let title: string | null = null;
  export let highlight: string | null = null;

  function getExt(name: string) {
    const parts = name.split('.');
    return `.${parts[parts.length - 1]}`;
  }

  $: filename = !name.includes('.') ? `${name}${getJSLibFileExt($jsLib)}` : name;
  $: baseRoutePath = stripJSLibFromPath($route.url.pathname).replace('/docs/player/', '');
  $: activeSnippets = snippets.filter((snippet) => baseRoutePath.startsWith(snippet.path));

  $: currentSnippet =
    activeSnippets.find((snippet) => snippet.name.startsWith(filename)) ??
    activeSnippets.find((snippet) => snippet.name === `${name}.html`); // try and fallback to html

  $: currentTitle = currentSnippet ? title?.replace('$ext', getExt(currentSnippet.name)) : '';

  $: currentHighlight =
    highlight?.includes('|') || /^\w+:/.test(highlight ?? '')
      ? highlight!
          .split('|') // "html:3,4-5|react:3-5"
          .map((h) => h.split(':'))
          .find((h) => h[0] === $jsLib)?.[1]
      : highlight;

  $: estimatedCodeHeight = (currentSnippet?.lines ?? 0) * 27;

  let tokens;
  let hasLoaded = false;
  let isVisible = false;

  $: if (isVisible) loadSnippet(currentSnippet);

  async function loadSnippet(snippet) {
    hasLoaded = false;
    if (!snippet) return;
    tokens = await snippet?.loader();
    hasLoaded = true;
  }

  const onIntersect: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      isVisible = true;
    }
  };
</script>

{#if !hasLoaded}
  <div
    class="code-fence overflow-y-auto relative max-h-[60vh] 576:max-h-[32rem] my-8 rounded-md shadow-lg mx-auto border border-gray-outline"
    style="color-scheme: dark; background-color: var(--code-fence-bg);"
    aria-busy={ariaBool(!hasLoaded)}
    use:intersectionObserver={{ callback: onIntersect }}
  >
    <IndeterminateLoading />

    {#if $$restProps.copy}
      <div style="height: 44px;" />
    {:else if currentTitle}
      <div style="height: 28px;" />
    {/if}

    <pre class="m-0">
      <div style={`height: ${estimatedCodeHeight}px;`} />
    </pre>
  </div>
{:else}
  <CodeFence {...tokens} title={currentTitle} highlight={currentHighlight} {...$$restProps} />
{/if}
