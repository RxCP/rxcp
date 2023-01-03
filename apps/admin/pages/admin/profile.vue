<script setup></script>

<template>
  <div class="grid lg:grid-cols-4 gap-4 items-start max-w-6xl">
    <div class="lg:col-span-3 bg-white dark:bg-slate-800 rounded p-8">
      <NuxtPage />
    </div>
    <div
      class="order-first lg:order-last lg:col-span-1 bg-white dark:bg-slate-800 rounded p-4"
    >
      <nav>
        <ul class="p-0 text-sm list-none">
          <li>
            <NuxtLink
              to="/admin/profile"
              class="no-underline p-2 block dark:text-slate-300 flex items-center space-x-2"
            >
              <span
                class="i-ic-baseline-keyboard-arrow-right text-xl inline-block"
              ></span>
              <span class="inline-block">Profile Information</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/admin/profile/change-email"
              class="no-underline p-2 block dark:text-slate-300 flex items-center space-x-2"
            >
              <span
                class="i-ic-baseline-keyboard-arrow-right text-xl inline-block"
              ></span>
              <span class="inline-block">Change Email</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/admin/profile/change-password"
              class="no-underline p-2 block dark:text-slate-300 flex items-center space-x-2"
            >
              <span
                class="i-ic-baseline-keyboard-arrow-right text-xl inline-block"
              ></span>
              <span class="inline-block">Change Password</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
