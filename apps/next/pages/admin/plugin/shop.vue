<script setup>
definePageMeta({
  middleware: ['auth']
});

const { setPageTitle } = usePageStore()

setPageTitle('Shop')
</script>

<template>
  <div>Shop</div>
</template>
