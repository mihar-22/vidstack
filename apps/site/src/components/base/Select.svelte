<script lang="ts">
  import clsx from 'clsx';

  import ArrowDropDownIcon from '~icons/ri/arrow-drop-down-fill';

  export let title: string;
  export let options: string[] = [];
  export let value: string = options[0];
  export let disabled = false;
  export let rounded = true;
  export let raised = true;
  export let arrowWidth = 20;
  export let arrowHeight = 20;
</script>

<div class="inline-block">
  <label
    class={clsx(
      'relative flex items-center border border-gray-divider',
      rounded && 'rounded-full',
      disabled ? 'text-gray-300' : 'text-gray-inverse focus-within:ring-2',
      raised ? 'bg-gray-elevate hover:bg-gray-hover shadow-sm' : 'hover:bg-gray-hover',
    )}
    style="padding: var(--select-padding, 0.25rem 0.2rem 0.25rem 0.5rem); min-width: var(--select-min-width, 6rem); --tw-ring-color: var(--select-color-focus);"
  >
    <slot name="before-title" />

    <div class="flex mx-auto items-center justify-center">
      <span class="sr-only">{title}</span>

      <span
        class="flex h-full mt-0.5 items-center"
        style="font-size: var(--select-value-font-size, 0.875rem);"
      >
        {value}
      </span>

      <ArrowDropDownIcon
        width={arrowWidth}
        height={arrowHeight}
        class="ml-[var(--select-arrow-margin-left,0.1rem)]"
      />
    </div>

    <select
      class="cursor-pointer opacity-0 inset-0 absolute appearance-none"
      bind:value
      on:change
      {disabled}
    >
      {#each options as value (value)}
        <option {value}>{value}</option>
      {/each}
      <slot />
    </select>
  </label>
</div>
