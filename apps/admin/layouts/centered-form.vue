<script setup>
const isDark = useDark()
useToggle(isDark)
</script>

<template>
  <div
    class="login-wrapper flex items-center flex-col justify-center h-screen px-4 lt-lg:pb-8 min-h-md"
  >
    <div class="text-center my-10">
      <SharedLogo :width="60" />
    </div>
    <div
      un-bg="white dark:slate-800"
      class="mx-auto mx-4 w-full max-w-[300px] p-6 md:p-10 shadow-md rounded"
    >
      <slot />
    </div>
  </div>
</template>
