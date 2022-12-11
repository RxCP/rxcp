<script setup>
import { ID_INJECTION_KEY } from 'element-plus';

const isLoading = ref(true);

provide(ID_INJECTION_KEY, {
  prefix: 100,
  current: 0
});

onMounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <div
    v-if="!isLoading"
    class="text-slate-700 dark:bg-slate-900 dark:text-zinc-200 font-sans h-full"
  >
    <NuxtLayout>
      <NuxtLoadingIndicator
        color="repeating-linear-gradient(to right,#c026d3 0%,#34cdfe 50%,#6d28d9 100%)"
        :height="4"
      />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
