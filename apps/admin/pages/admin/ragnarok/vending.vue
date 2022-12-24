<script setup>
definePageMeta({
  middleware: ['auth']
})

const { setPageTitle } = usePageStore()

setPageTitle('Vending')
</script>

<template>
  <div>Vending</div>
</template>
