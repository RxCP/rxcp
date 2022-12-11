<script setup>
import {
  ElDropdown,
  ElIcon,
  ElDropdownItem,
  ElDropdownMenu,
  ElAvatar,
  ElButton,
  ElTooltip
} from 'element-plus';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const firstName = computed(() => {
  const { authUser } = useAuthStore();
  return authUser?.first_name;
});

const pageTitle = computed(() => {
  const { pageTitle } = usePageStore()
  return pageTitle
})

async function handleLogOut() {
  await useLogOut();
}
</script>

<template>
  <!-- header -->
  <header
    class="flex items-center px-4 mb-4 md:px-6 py-2 bg-white dark:bg-slate-800/50"
  >
    <!-- <h2 class="dark:text-gray-200 text-lg font-bold" v-text="pageTitle"></h2> -->
    <ul class="flex space-x-3 list-none p-0">
      <li>
        <el-tooltip
          effect="dark"
          content="Login server"
          placement="top-start"
        >
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip
          effect="dark"
          content="Char server"
          placement="top-start"
        >
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip
          effect="dark"
          content="Map server"
          placement="top-start"
        >
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        </el-tooltip>
      </li>
    </ul>
    <div class="ml-auto flex items-center space-x-4">
      <el-button link @click="toggleDark()">
        <div
          :class="{ 'i-tabler-sun': !isDark, 'i-tabler-moon': isDark }"
          class="text-2xl"
        ></div>
      </el-button>
      <el-dropdown trigger="click">
        <span class="flex items-center cursor-pointer">
          <el-avatar :src="`https://ui-avatars.com/api/?name=${firstName}`" />
          <el-icon class="el-icon--right">
            <div class="i-ic-outline-keyboard-arrow-down"></div>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="white dark:gray-700 w-44">
            <el-dropdown-item>Profile</el-dropdown-item>
            <el-dropdown-item>Settings</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogOut"
              >Sign Out</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
  <!-- // header -->
</template>
