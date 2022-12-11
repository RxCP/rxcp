<script setup>
definePageMeta({
  middleware: ['auth']
});

const { setPageTitle } = usePageStore()

setPageTitle('Guilds')
</script>

<template>
  <div>Guilds</div>
</template>
