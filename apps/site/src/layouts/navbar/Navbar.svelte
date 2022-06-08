<script lang="ts">
  import clsx from 'clsx';
  import { createEventDispatcher } from 'svelte';
  import { uppercaseFirstLetter } from '@vidstack/foundation';

  import MenuIcon from '~icons/ri/menu-5-line';
  import ArrowDropDownIcon from '~icons/ri/arrow-drop-down-line';

  import { colorScheme } from '$src/stores/color-scheme';
  import Popover from '$src/components/base/Popover.svelte';
  import ColorSchemeMenu from '$src/components/base/ColorSchemeMenu.svelte';

  import NavLinkItem from './NavLink.svelte';
  import { getNavbarContext } from './context';

  export let search = false;

  const { links } = getNavbarContext();

  const dispatch = createEventDispatcher();

  function onOpenPopover() {
    dispatch('open-popover');
  }

  function onClosePopover() {
    dispatch('close-popover');
  }
</script>

<div
  class="flex flex-col h-[var(--navbar-height)] mx-auto max-w-[var(--navbar-max-width)] p-[var(--navbar-padding)] w-full items-center justify-center"
>
  <div class={clsx('flex w-full items-center')}>
    <slot name="left" />

    <div class="flex-1" />

    <div class="flex -mr-2 items-center 992:hidden">
      {#if search}
        <slot name="search" />
      {/if}

      <Popover overlay on:open={onOpenPopover} on:close={onClosePopover}>
        <svelte:fragment slot="button">
          <MenuIcon class="mr-2" width="30" height="30" />
          <span class="sr-only">Open Main Menu</span>
        </svelte:fragment>

        <slot name="popover-top" />

        <section class="flex flex-col items-start">
          <h1 class="text-gray-soft text-lg mb-3">Links</h1>
          <nav>
            <ul class="-ml-0.5">
              {#each $links as navLink (navLink.title)}
                <NavLinkItem {...navLink} />
              {/each}
            </ul>
          </nav>
        </section>

        <slot name="popover-middle" />

        <hr class="border-t border-gray-200 mt-8 h-2 mb-6 w-full dark:border-gray-400" />

        <section class="flex flex-col items-start">
          <h1 class="text-gray-soft text-lg mb-3">Options</h1>
          <div class="flex flex-col space-y-6">
            <slot name="popover-options" />
            <div class="flex items-center">
              <span class="text-lg 992:text-base">Theme</span>

              <label
                class="border rounded-md flex border-gray-200 ml-4 py-2 pl-4 pr-3 relative items-center dark:border-gray-400 focus-within:ring-2"
                style="--tw-ring-color: var(--color-focus);"
              >
                <span class="sr-only">Color Scheme</span>
                {uppercaseFirstLetter($colorScheme)}
                <ArrowDropDownIcon width="20" height="20" class="ml-1 mt-px" />
                <select
                  class="opacity-0 inset-0 absolute appearance-none"
                  bind:value={$colorScheme}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </label>
            </div>
          </div>
        </section>

        <slot name="popover-bottom" />
      </Popover>
    </div>

    <div class="hidden 992:flex 992:items-center">
      <nav>
        <ul class="flex space-x-8 items-center">
          {#each $links as navLink (navLink.title)}
            <NavLinkItem {...navLink} />
          {/each}
        </ul>
      </nav>

      <slot name="right" />

      <div class="border-gray-divider border-l-[1.5px] h-7 mr-2 ml-5 w-2" />

      <div class="hidden items-center 992:flex">
        <slot name="right-alt" />
        <ColorSchemeMenu />
      </div>
    </div>
  </div>

  <slot name="bottom" />
</div>
