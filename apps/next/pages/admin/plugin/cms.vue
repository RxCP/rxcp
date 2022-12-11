<script setup>
definePageMeta({
  middleware: ['auth']
});

const { setPageTitle } = usePageStore()

setPageTitle('CMS')
</script>

<template>
  <div>CMS</div>
</template>
