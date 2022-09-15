<script lang="ts">
  export let hasSidebar: boolean = false;
</script>

<div class="mx-6 flex-1 py-4 {hasSidebar && 'lg:ml-[232px] xl:ml-[232px]'}">
  <slot />
</div>
