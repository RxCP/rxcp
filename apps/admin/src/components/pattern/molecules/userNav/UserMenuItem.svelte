<script lang="ts">
  export let text: string;
  export let to: string;
</script>

<li>
  <a
    href={to}
    un-bg="hover:gray-100 dark:hover:gray-600"
    class="block py-2 px-4 dark:hover:text-white"
  >
    {text}
  </a>
</li>
