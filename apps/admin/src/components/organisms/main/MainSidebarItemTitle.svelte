<script>
  export let className;
  export let text;
</script>

<li>
  <span
    class={`${className} block text-gray-400 dark:text-gray-500 py-2 px-4 uppercase text-xs`}
  >
    {text}
  </span>
</li>
