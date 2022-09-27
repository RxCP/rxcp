<script lang="ts">
  export let status: 'info' | 'warning' | 'success' | 'error' | 'loading';

  $: info = status === 'info' && 'text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800'
  $: error = status === 'error' && 'text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800'
</script>

<div
  class="px-3 py-2 mb-4 text-sm rounded {error} {info}"
  role="alert"
>
  <slot />
</div>
