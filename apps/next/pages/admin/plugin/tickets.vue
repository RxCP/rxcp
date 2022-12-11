<script setup>
definePageMeta({
  middleware: ['auth']
});

const { setPageTitle } = usePageStore()

setPageTitle('Tickets')
</script>

<template>
  <div>Tickets</div>
</template>
