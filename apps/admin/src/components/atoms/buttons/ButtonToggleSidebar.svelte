<script>
  import { onMount } from 'svelte';

  onMount(() => {
    const button = document.getElementById('toggleSidebarButton');
    const sidebar = document.getElementById('contentSidebar');
    const sidebarButtonClose = sidebar.querySelector('[data-close]');

    const toggleClass = 'left-0';

    button.addEventListener('click', handleShowSidebar);
    sidebarButtonClose.addEventListener('click', handleShowSidebar);

    function handleShowSidebar() {
      if (sidebar.classList.contains(toggleClass)) {
        sidebar.classList.remove(toggleClass);
      } else {
        sidebar.classList.add(toggleClass);
      }
    }

    return () => {
      button.removeEventListener('click', handleShowSidebar);
      sidebarButtonClose.removeEventListener('click', handleShowSidebar);
    };
  });
</script>

<div
  id="toggleSidebarButton"
  un-border="b slate-200 dark:slate-800"
  class="lg:hidden px-6 py-4 -mt-4 mb-4 -ml-6 -mr-6"
>
  <div class="i-tabler-menu-2 text-2xl" />
</div>
