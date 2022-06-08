<script>
  import clsx from 'clsx';
  import { route } from '@vitebook/svelte';

  import { addJSLibToPath, jsLib } from '$src/stores/js-lib';

  export let title;
  export let href;

  $: _href = addJSLibToPath(href, $jsLib);
  $: isActive = $route.url.pathname === _href;
</script>

<li>
  <h2>
    <a
      class={clsx(
        '-mb-px flex border-current pt-3 pb-2.5 leading-6 px-4 hover:border-b-2',
        isActive ? 'text-brand font-semibold border-b-2' : 'text-gray-soft hover:text-gray-inverse',
      )}
      href={_href}
    >
      {title}
    </a>
  </h2>
</li>
