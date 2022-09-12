<script>
  import { signOut } from '@astro-auth/client';
</script>

<div class="py-1">
  <span
    on:click={() => {
      signOut('/login');
    }}
    un-bg="hover:gray-100 dark:hover:gray-600"
    un-text="sm gray-700 dark:gray-200 dark:hover:white"
    class="block py-2 px-4 cursor-pointer"
  >
    Sign out
  </span>
</div>
