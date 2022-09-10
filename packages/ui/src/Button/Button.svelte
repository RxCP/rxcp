<script lang="ts">
  export let type : string = 'button';
  export let disabled : boolean = false;
  export let isLoading : boolean = false;
</script>

<button
  {type}
  {disabled}
  class:bg-blue-700={!disabled}
  class:bg-blue-400={disabled}
  class="block text-white hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-400
    font-medium rounded text-sm w-full px-5 py-2.5 text-center"
>
  {#if isLoading }
    <svg class="inline-block animate-spin -ml-1 -mt-1 mr-3 h-4.5 w-4.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  {:else}
  <slot />
  {/if}
</button>
