<script lang="ts">
  export let type : string = 'button';
  export let disabled : boolean = false;
</script>

<button
  {type}
  {disabled}
  class:bg-blue-700={!disabled}
  class:bg-blue-400={disabled}
  class="block text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
    font-medium rounded text-sm w-full px-5 py-2.5 text-center dark:focus:ring-blue-800"
>
  <slot />
</button>
