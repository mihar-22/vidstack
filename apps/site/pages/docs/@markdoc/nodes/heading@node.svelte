<script>
  export let id;
  export let level;
</script>

<svelte:element this={`h${level}`} {id} tabindex="-1">
  <a href={`#${id}`} class="header-anchor" aria-hidden="true">#</a>
  <slot />
</svelte:element>
