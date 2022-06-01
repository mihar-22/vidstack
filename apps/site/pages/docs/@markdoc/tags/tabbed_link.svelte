<script>
  import clsx from 'clsx';
  import { route } from '@vitebook/svelte';

  export let title;
  export let href;

  $: isActive = $route.url.pathname === href;
</script>

<li>
  <h2>
    <a
      class={clsx(
        '-mb-px flex border-current pt-3 pb-2.5 leading-6 px-4 hover:border-b-2',
        isActive ? 'text-brand font-semibold border-b-2' : 'text-gray-soft hover:text-gray-inverse',
      )}
      {href}
    >
      {title}
    </a>
  </h2>
</li>
