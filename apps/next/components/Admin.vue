<script setup>
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <slot />
</template>
