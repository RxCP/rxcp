<script lang="ts">
  export let hasSidebar: boolean = false;
</script>

<div
  class="px-4 md:px-6 flex-1 py-4 w-full
  {(hasSidebar && 'lg:ml-[212px]') || ''}"
>
  <slot />
</div>
