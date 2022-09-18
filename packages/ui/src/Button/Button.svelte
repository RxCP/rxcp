<script lang="ts">
  import setcolorClass from '../util/setcolorClass';
  import type {
    buttonColor,
    buttonSize,
    buttonType,
    buttonVariant,
  } from './ButtonTypes';

  export let type: buttonType = 'button';
  export let size: buttonSize = 'md';
  export let variant: buttonVariant = 'solid';
  export let color: buttonColor = 'primary';
  export let href: string = '';
  export let isDisabled: boolean = false;
  export let isLoading: boolean = false;
  export let isBlock: boolean = false;

  const colorClass = {
    solid: {
      primary: {
        base: 'text-white border border-transparent',
        default: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300',
        disabled: 'bg-blue-300 cursor-not-allowed',
      },
      secondary: {
        base: 'text-white border border-transparent',
        default: 'bg-slate-600 hover:bg-slate-700 focus:ring-blue-300',
        disabled: 'bg-slate-300 cursor-not-allowed',
      },
    },
    outline: {
      primary: {
        base: 'text-blue-600',
        default:
          'bg-transparent border border-blue-600 hover:bg-blue-700 hover:text-white',
      },
      secondary: {
        base: 'bg-transparent',
        default:
          'text-slate-600 border border-slate-600 hover:bg-slate-700 hover:text-white',
        disabled:
          'cursor-not-allowed text-slate-600/50 border border-slate-600/20',
      },
    },
    ghost: {
      primary: {
        default: 'hover:bg-slate-100 hover:dark:bg-blue-600/10',
        disabled: 'opacity-30 cursor-not-allowed',
      },
      secondary: {
        default: 'hover:bg-gray-100 hover:dark:bg-gray-600/10',
        disabled: 'opacity-30 cursor-not-allowed',
      },
    },
  };

  const sizeClass = {
    xs: 'py-2 px-3 text-xs',
    sm: 'py-2 px-3 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'py-3 px-5 text-base',
  };

  $: variantClass = setcolorClass(colorClass, variant, color, isDisabled);
  $: as = href ? 'a' : 'button';
</script>

<svelte:element
  this={as}
  {type}
  {href}
  disabled={isDisabled}
  class:w-full={isBlock}
  class="block focus:ring-2 focus:outline-none
    font-medium rounded text-center {variantClass} {sizeClass[size]}"
  on:click
>
  {#if isLoading}
    <svg
      class="inline-block animate-spin -mt-1 h-4.5 w-4.5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  {:else}
    <slot />
  {/if}
</svelte:element>
