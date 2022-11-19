<script lang="ts">
  export let status: 'info' | 'warning' | 'success' | 'error' | 'loading';

  let className = $$props.class;

  $: info = status === 'info' && 'text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800'
  $: error = status === 'error' && 'text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800'
</script>

<div
  class="px-3 py-2 text-sm rounded {error} {info} {className}"
  role="alert"
>
  <div class="flex space-x-2">
    <div
      class="
      {status === 'info' && 'i-ic-baseline-info'}
      {status === 'warning' && 'i-ic-baseline-warning'}
      {status === 'error' && 'i-ic-baseline-error'} text-xl"></div>
    <span><slot /></span>
  </div>
</div>
