<script setup>
import {
  ElDropdown,
  ElIcon,
  ElDropdownItem,
  ElDropdownMenu,
  ElAvatar,
  ElButton,
  ElTooltip,
  ElPopover
} from 'element-plus'
import { useDark, useToggle } from '@vueuse/core'

const router = useRouter()
const socket = useSocket()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const serverStatus = reactive({
  login: false,
  char: false,
  map: false,
  online: 0
})

const firstName = computed(() => {
  const { authUser } = useAuthStore()
  return authUser?.first_name
})

onMounted(() => {
  socket.on('server-status', (data) => {
    serverStatus.login = data?.login?.status
    serverStatus.char = data?.char?.status
    serverStatus.map = data?.map?.status
    serverStatus.online = data?.online
  })
})

async function handleLogOut() {
  await useLogOut()
}
</script>

<template>
  <!-- header -->
  <header
    class="flex items-center px-4 mb-4 md:px-6 py-2 bg-white dark:bg-slate-800/50"
  >
    <ul class="flex space-x-3 list-none p-0 items-center">
      <li>
        <span class="text-lg uppercase">
          <el-popover
            placement="top-start"
            title="Online"
            :width="200"
            trigger="hover"
          >
            <template #reference>
              <div class="i-tabler-users"></div>
            </template>
            <div>
              <strong class="text-green-500">{{ serverStatus.online }}</strong>
              player(s) online right now
            </div>
          </el-popover>
        </span>
      </li>
      <li>
        <el-tooltip effect="dark" content="Login server" placement="top-start">
          <div
            :class="{
              'bg-green-500': serverStatus.login,
              'bg-red-500': !serverStatus.login
            }"
            class="w-3 h-3 rounded-full"
          ></div>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip effect="dark" content="Char server" placement="top-start">
          <div
            :class="{
              'bg-green-500': serverStatus.char,
              'bg-red-500': !serverStatus.char
            }"
            class="w-3 h-3 rounded-full"
          ></div>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip effect="dark" content="Map server" placement="top-start">
          <div
            :class="{
              'bg-green-500': serverStatus.map,
              'bg-red-500': !serverStatus.map
            }"
            class="w-3 h-3 rounded-full"
          ></div>
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
            <el-dropdown-item @click="router.push('/admin/profile')"
              >Profile</el-dropdown-item
            >
            <el-dropdown-item @click="router.push('/admin/settings')"
              >Settings</el-dropdown-item
            >
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
