<script setup>
import { ElSwitch, ElForm, ElInput, ElFormItem } from 'element-plus'

const { getAccount } = useApi()
const route = useRoute()

const accountDetails = ref({})

onMounted(async () => {
  const [response, error, status] = await getAccount
    .setParams({ accountId: route.params.id })
    .send()

  if (status !== 200) {
    console.warn(error)
    return
  }

  accountDetails.value = response?.data
  console.log(response?.data)
})
</script>

<template>
  <NuxtLink
    to="/admin/ragnarok/accounts"
    class="mb-6 flex items-center space-x-2 no-underline text-gray-400 dark:text-gray-500 hover:text-gray-400"
  >
    <span class="i-tabler-arrow-narrow-left"></span>
    <span>Back to Accounts</span>
  </NuxtLink>
  <div class="bg-white dark:bg-slate-800 rounded p-8 max-w-2xl">
    <div class="flex mb-6">
      <div>
        <h1 class="my-0">Account Details</h1>
        <p
          class="text-gray-400 dark:text-slate-300 text-md leading-normal mt-2"
        >
          Access and manage Ragnarok account information, including login
          credentials, account settings, and privacy preferences.
        </p>
      </div>
    </div>

    <el-form label-position="top">
      <div class="grid md:grid-cols-2 gap-4">
        <el-form-item label="Account ID">
          <el-input readonly :model-value="accountDetails.account_id" />
        </el-form-item>
        <el-form-item label="User ID">
          <el-input readonly :model-value="accountDetails.userid" />
        </el-form-item>
        <el-form-item label="Gender">
          <el-input readonly :model-value="accountDetails.sex" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input readonly :model-value="accountDetails.email" />
        </el-form-item>
        <el-form-item label="Group">
          <el-input readonly :model-value="accountDetails.group_id" />
        </el-form-item>
        <el-form-item label="State">
          <el-input readonly :model-value="accountDetails.state" />
        </el-form-item>
        <el-form-item label="Unban Time">
          <el-input readonly :model-value="accountDetails.unban_time" />
        </el-form-item>
        <el-form-item label="Expiration Time">
          <el-input readonly :model-value="accountDetails.expiration_time" />
        </el-form-item>
        <el-form-item label="Login Count">
          <el-input readonly :model-value="accountDetails.logincount" />
        </el-form-item>
        <el-form-item label="Last Login">
          <el-input readonly :model-value="accountDetails.lastlogin" />
        </el-form-item>
        <el-form-item label="Last IP">
          <el-input readonly :model-value="accountDetails.last_ip" />
        </el-form-item>
        <el-form-item label="Birth Date">
          <el-input readonly :model-value="accountDetails.birthdate" />
        </el-form-item>
        <el-form-item label="Character Slots">
          <el-input readonly :model-value="accountDetails.character_slots" />
        </el-form-item>
        <el-form-item label="Pin Code">
          <el-input type="password" readonly value="pincode" />
        </el-form-item>
        <el-form-item label="Pin Code Change">
          <el-input readonly :model-value="accountDetails.pincode_change" />
        </el-form-item>
        <el-form-item label="VIP TIme">
          <el-input readonly :model-value="accountDetails.vip_time" />
        </el-form-item>
        <el-form-item label="Old Group">
          <el-input readonly :model-value="accountDetails.old_group" />
        </el-form-item>
      </div>
      <!-- <div class="text-right mt-8">
        <el-button type="primary"> Save </el-button>
      </div> -->
    </el-form>
  </div>
</template>
