<script setup>
definePageMeta({
  middleware: ['auth']
});

const { setPageTitle } = usePageStore()

setPageTitle('Database')
</script>

<template>
  <div>Database</div>
</template>
