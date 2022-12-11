<script>
definePageMeta({
  middleware: ['auth']
})

const { setPageTitle } = usePageStore()

setPageTitle('Dashboard')
</script>

<template>
  <div>Index</div>
</template>
