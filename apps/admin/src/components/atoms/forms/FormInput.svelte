<script>
  export let type;
  export let id;
  export let placeholder;
</script>

<input
  {type}
  {id}
  class="border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none dark:border-slate-700 dark:placeholder-gray-400 dark:text-slate-300 dark:focus:ring-blue-800 dark:focus:border-blue-800"
  un:bg="gray-50 dark:slate-900"
  {placeholder}
  required
/>
