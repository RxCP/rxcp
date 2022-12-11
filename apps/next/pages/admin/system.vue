<script setup>
definePageMeta({
  layout: false
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <template #sidebar> Custom sidebar </template>
      The rest of the page
    </NuxtLayout>
  </div>
</template>
>
