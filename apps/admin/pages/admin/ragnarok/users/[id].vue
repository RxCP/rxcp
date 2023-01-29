<script setup>
import { ElSwitch, ElForm, ElInput, ElFormItem } from 'element-plus'
const { $api } = useNuxtApp()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  createdAt: '',
  confirmed: false,
  blocked: false
})

onMounted(async () => {
  const [data, error, status] = await $api.users.getUser
    .setParams({ userId: 1 })
    .send()

  if (status !== 200) {
    console.warn(error)
    return
  }

  const user = data.data

  form.firstName = user.first_name
  form.lastName = user.last_name
  form.email = user.email
  form.createdAt = user.created_at
  form.confirmed = user.confirmed
  form.blocked = user.blocked
})
</script>

<template>
  <NuxtLink
    to="/admin/ragnarok/users"
    class="mb-6 flex items-center space-x-2 no-underline text-gray-400 dark:text-gray-500 hover:text-gray-400"
  >
    <span class="i-tabler-arrow-narrow-left"></span>
    <span class="">Back to Users</span>
  </NuxtLink>
  <div class="bg-white dark:bg-slate-800 rounded p-8 max-w-2xl">
    <div class="flex mb-6">
      <div>
        <h1 class="my-0">User Details</h1>
        <p class="text-gray-400 dark:text-slate-300 text-lg mt-2">
          Manage user information.
        </p>
      </div>
    </div>

    <el-form :model="form" label-position="top">
      <div class="grid md:grid-cols-2 gap-4">
        <el-form-item label="First Name">
          <el-input v-model="form.firstName" readonly />
        </el-form-item>
        <el-form-item label="Last Name">
          <el-input v-model="form.lastName" readonly />
        </el-form-item>
        <el-form-item label="Email Address">
          <el-input v-model="form.email" readonly />
        </el-form-item>
        <el-form-item label="Date Created">
          <el-input v-model="form.createdAt" readonly />
        </el-form-item>
        <el-form-item label="Confirmed">
          <el-switch v-model="form.confirmed" disabled />
        </el-form-item>
        <el-form-item label="Blocked">
          <el-switch v-model="form.blocked" disabled />
        </el-form-item>
      </div>
      <!-- <div class="text-right mt-8">
        <el-button type="primary"> Save </el-button>
      </div> -->
    </el-form>
  </div>
</template>
