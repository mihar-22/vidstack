<script lang="ts">
  import clsx from 'clsx';
  import { route } from '@vitebook/svelte';
  import { isNull } from '@vidstack/foundation';

  export let title: string;
  export let slug: string;
  export let match: RegExp | null = null;

  $: isActive = match?.test($route.url.pathname);
</script>

<li class="mt-4 992:mt-0 first:mt-0">
  <a
    class={clsx(
      'p-1',
      isActive
        ? 'border-b hover:border-b-2 border-brand text-gray-inverse'
        : 'text-gray-soft hover:text-gray-inverse',
    )}
    href={slug}
    target={isNull(match) ? '_blank' : null}
  >
    {title}
  </a>
</li>
