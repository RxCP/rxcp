<script setup>
definePageMeta({
  middleware: ['auth']
})

useHead({
  title: 'Dashboard'
})

const firstName = computed(() => {
  const { authUser } = useAuthStore()
  return authUser?.first_name
})
</script>

<template>
  <section class="mb-8">
    <h1 class="text-3xl font-bold">
      Hi, {{ firstName }} 👋
      <small class="block text-base font-medium mt-2">Welcome back!</small>
    </h1>
  </section>
</template>
