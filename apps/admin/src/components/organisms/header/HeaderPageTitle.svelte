<script>
  export let to = '';
  export let text;
</script>

<a href={to || 'javascript:void(0)'} class="dark:text-gray-500">
  <h2 class="dark:text-gray-200 text-2xl font-medium">{text}</h2>
</a>
