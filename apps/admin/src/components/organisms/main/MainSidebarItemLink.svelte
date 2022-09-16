<script>
  export let to;
  export let text;
</script>

<li>
  <a
    href={to}
    class="block text-gray-600
      dark:text-slate-400 border-l border-transparent hover:border-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800/50
      py-2 px-4 text-sm"
  >
    {text}
  </a>
</li>
