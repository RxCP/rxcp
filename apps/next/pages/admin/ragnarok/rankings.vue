<script setup>
definePageMeta({
  middleware: ['auth']
});

const { setPageTitle } = usePageStore()

setPageTitle('Rankings')
</script>

<template>
  <div>Rankings</div>
</template>
