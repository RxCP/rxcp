<script setup>
import {
  ElMenu,
  ElSubMenu,
  ElIcon,
  ElMenuItem,
  ElButton,
  ElDivider,
  ElScrollbar
} from 'element-plus';
import { ref } from 'vue';
import { useLogOut } from '~~/composables/useLogOut';


const router = useRouter();
const isSidebarCollapse = ref(false);
const isLoading = ref(true);
const isMobileMenuShow = ref(false);
const menu = ref({
  ragnarok: [
    {
      url: '/admin/ragnarok/users',
      text: 'Users',
      iconClass: 'i-tabler-user-circle'
    },
    {
      url: '/admin/ragnarok/accounts',
      text: 'Accounts',
      iconClass: 'i-tabler-user'
    },
    {
      url: '/admin/ragnarok/characters',
      text: 'Characters',
      iconClass: 'i-tabler-users'
    },
    {
      url: '/admin/ragnarok/guilds',
      text: 'Guilds',
      iconClass: 'i-tabler-building-skyscraper'
    },
    {
      url: '/admin/ragnarok/rankings',
      text: 'Rankings',
      iconClass: 'i-tabler-chart-bar'
    },
    {
      url: '/admin/ragnarok/vending',
      text: 'Vending',
      iconClass: 'i-tabler-zoom-money'
    },
    {
      url: '/admin/ragnarok/database',
      text: 'Database',
      iconClass: 'i-tabler-database'
    }
  ],
  plugins: [
    {
      url: '/admin/plugin/cms',
      text: 'CMS',
      iconClass: 'i-tabler-note'
    },
    {
      url: '/admin/plugin/vote',
      text: 'Vote4Points',
      iconClass: 'i-tabler-pencil'
    },
    {
      url: '/admin/plugin/shop',
      text: 'Shop',
      iconClass: 'i-tabler-shopping-cart'
    },
    {
      url: '/admin/plugin/tickets',
      text: 'Tickets',
      iconClass: 'i-tabler-ticket'
    },
  ]
});
const $primaryMenu = ref();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - RXCP` : 'RXCP';
  }
})

onMounted(() => {
  nextTick(() => {
    window.addEventListener('resize', onResize);
    collapseSidebar();
  });

  isLoading.value = false;
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});

function onResize() {
  collapseSidebar();
}

function collapseSidebar() {
  isSidebarCollapse.value =
    window.innerWidth >= 1024 && window.innerWidth <= 1280;
}

function handleMenuClick(url) {
  router.push(url);
}

function handleMobileMenuClick() {
  const toggleClass = 'lt-lg:hidden';

  if ($primaryMenu?.value.classList.contains(toggleClass)) {
    $primaryMenu?.value.classList.remove(toggleClass);
    isMobileMenuShow.value = true;
  } else {
    $primaryMenu?.value.classList.add(toggleClass);
    isMobileMenuShow.value = false;
  }
}

async function handleLogOut() {
  await useLogOut();
}
</script>

<template>
  <!-- Navbar mobile -->
  <div
    un-bg="white dark:gray-900"
    class="p-4 flex items-center justify-between lg:hidden"
  >
    <SharedLogo :width="50" />
    <!-- burger menu -->
    <el-button link @click="handleMobileMenuClick">
      <div class="i-tabler-menu-2 text-3xl text-gray-500"></div>
    </el-button>
    <!-- // burger menu -->
  </div>
  <!-- overlay -->
  <div
    v-show="isMobileMenuShow"
    class="bg-slate-800/80 fixed inset-0 w-full h-full z-10"
    @click="handleMobileMenuClick"
  ></div>
  <!-- // overlay -->
  <!-- Sidebar -->
  <aside
    id="primaryMenu"
    ref="$primaryMenu"
    un-bg="white dark:stone-900/20 dark:gradient-to-tr"
    un-border="dark:slate-800 r slate-200"
    class="shadow-md lg:shadow-none fixed z-50 top-0 h-full lt-lg:hidden flex-grow basis-14 dark:from-slate-800 dark:to-slate-900"
    aria-label="Sidebar"
  >
    <!-- scrollbar -->
    <el-scrollbar>
      <!-- aside inner -->
      <div class="w-64 lg:w-auto xl:w-64 overflow-y-auto">
        <!-- logo wrapper-->
        <div class="p-2xl text-center flex items-center space-x-4 font-medium">
          <SharedLogo :width="isSidebarCollapse ? 40 : 60" />
          <span class="text-2xl font-bold lg:hidden xl:inline-block">RXCP</span>
        </div>
        <!-- // logo wrapper-->
        <el-menu
          default-active="1"
          :collapse="isSidebarCollapse"
          :collapse-transition="false"
          class="bg-white dark:bg-transparent border-0 mx-auto w-full"
        >
          <!-- dashboard menu item -->
          <el-menu-item index="1" @click="handleMenuClick('/admin')">
            <el-icon>
              <div class="i-tabler-layout-dashboard"></div>
            </el-icon>
            <template #title>Dashboard</template>
          </el-menu-item>
          <!-- // dashboard menu item -->
          <!-- ragnarok menu item -->
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <div class="i-tabler-device-gamepad"></div>
              </el-icon>
              <span>Ragnarok</span>
            </template>
            <el-menu-item
              v-for="(menuItem, index) in menu.ragnarok"
              :key="index"
              :index="`2-${index + 1}`"
              @click="handleMenuClick(menuItem.url)"
            >
              <el-icon>
                <div :class="menuItem.iconClass"></div>
              </el-icon>
              <template #title>{{ menuItem.text }}</template>
            </el-menu-item>
          </el-sub-menu>
          <!-- // ragnarok menu item -->
          <!-- plugin menu item -->
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <div class="i-tabler-plug"></div>
              </el-icon>
              <span>Plugins</span>
            </template>
            <el-menu-item
              v-for="(menuItem, index) in menu.plugins"
              :key="index"
              :index="`3-${index + 1}`"
              @click="handleMenuClick(menuItem.url)"
            >
              <el-icon>
                <div :class="menuItem.iconClass"></div>
              </el-icon>
              <template #title>{{ menuItem.text }}</template>
            </el-menu-item>
          </el-sub-menu>
          <!-- // plugin menu item -->
          <!-- system menu item-->
          <el-menu-item index="4" @click="handleMenuClick('/admin/system')">
            <el-icon>
              <div class="i-tabler-heart-rate-monitor"></div>
            </el-icon>
            <template #title>System</template>
          </el-menu-item>
          <el-divider />
          <el-menu-item index="5" @click="handleMenuClick('/admin/help')">
            <el-icon>
              <div class="i-tabler-help"></div>
            </el-icon>
            <template #title>Help</template>
          </el-menu-item>
          <el-menu-item index="5" @click="handleLogOut">
            <el-icon>
              <div class="i-tabler-logout"></div>
            </el-icon>
            <template #title>Log Out</template>
          </el-menu-item>
          <!--// system menu item-->
        </el-menu>
      </div>
      <!-- // aside inner -->
    </el-scrollbar>
    <!-- // scrollbar -->
  </aside>
  <!-- // Sidebar -->
  <!-- Main wrapper -->
  <main class="lg:ml-[90px] xl:ml-[257px]">
    <!-- main inner -->
    <div class="app-scrollbar flex h-screen">
      <!-- main content wrapper-->
      <div class="w-full">
        <TheHeader />
        <!-- main content -->
        <div class="p-4 md:p-6 flex-1">
          <div class="mx-auto w-full max-w-7xl">
            <slot></slot>
          </div>
        </div>
        <!-- // main content -->
      </div>
      <!-- // main content wrapper-->
    </div>
    <!-- // main inner -->
  </main>
  <!-- // Main wrapper -->
</template>
