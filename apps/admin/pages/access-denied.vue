<script setup>
useHead({
  title: 'Access Denied'
})

definePageMeta({
  layout: 'centered-form'
})

async function handleLogOut() {
  await useLogOut()
}
</script>

<template>
  <div class="text-center">
    <h1>Access Denied</h1>
    <p class="leading-snug">
      You don't have the permission to access this page.
    </p>
    <a href="javascript:void(0)" @click="handleLogOut">Log out</a>
  </div>
</template>
