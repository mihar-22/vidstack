<script lang="ts">
  import clsx from 'clsx';

  import ArrowDropDownIcon from '~icons/ri/arrow-drop-down-line';

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
      'relative flex items-center border border-gray-divider pl-3 pr-[5px] py-0.5',
      'transition-transform hover:scale-[1.025] transform-gpu',
      rounded && 'rounded-md',
      disabled ? 'text-gray-300' : 'text-gray-inverse focus-within:ring-2',
      raised ? 'bg-gray-divider dark:bg-gray-elevate shadow-sm' : 'hover:bg-gray-hover',
    )}
    style="--tw-ring-color: var(--color-focus);"
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
        class="mt-0.5 ml-[var(--select-arrow-margin-left,1px)]"
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
