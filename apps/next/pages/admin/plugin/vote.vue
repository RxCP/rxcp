<script setup>
definePageMeta({
  middleware: ['auth']
});

const { setPageTitle } = usePageStore()

setPageTitle('Vote4Points')
</script>

<template>
  <div>Vote4Points</div>
</template>
