<script lang="ts">
  import { markdown, route } from '@vitebook/svelte';

  import { getSidebarContext } from '$src/layouts/sidebar/context';
  import socialCardLarge from '$src/img/brand/social-card-large.jpg';

  const { activeCategory } = getSidebarContext();

  $: category = $activeCategory ? `${$activeCategory}: ` : '';
  $: title = $markdown?.title ? `${category}${$markdown.title} | Vidstack` : null;
  $: description = $markdown?.frontmatter.description;
</script>

<svelte:head>
  {#key $route.url.pathname}
    {#if title}
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
    {/if}
    {#if description}
      <meta name="description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta name="og:description" content={description} />
    {/if}
    {#if title && description}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@vidstackjs" />
      <meta name="twitter:image" content={`https:vidstack.io${socialCardLarge}`} />
      <meta name="twitter:creator" content="@vidstackjs" />
      <meta property="og:site_name" content="Vidstack" />
      <meta property="og:url" content={`https:vidstack.io${$route.url.pathname}`} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={`https:vidstack.io${socialCardLarge}`} />
    {/if}
  {/key}
</svelte:head>
