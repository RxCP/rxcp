<script setup>
definePageMeta({
  middleware: ['auth']
})

const { setPageTitle } = usePageStore()

setPageTitle('Characters')
</script>

<template>
  <div>Characters</div>
</template>
