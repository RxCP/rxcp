<script setup>
import {
  ElTable,
  ElTableColumn,
  ElAvatar,
  ElInput,
  ElPagination,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  vLoading
} from 'element-plus'
import { format, parseISO } from 'date-fns'

definePageMeta({
  middleware: ['auth']
})

useHead({
  title: 'Ragnarok Accounts'
})

const router = useRouter()
const { getAccounts } = useApi()
const { limit, page, total, items, isLoading, search, handleSearch } =
  await usePagination(getAccounts)

const accounts = computed(() => {
  return items.value.map((item) => {
    return {
      ...item,
      ...{
        group: item.group_id,
        lastloginDate:
          item.lastlogin && format(parseISO(item.lastlogin), 'MM/dd/yyyy')
      }
    }
  })
})

function handleViewDetails(id) {
  router.push(`/admin/ragnarok/accounts/${id}`)
}
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded p-8">
    <div class="flex mb-6">
      <div>
        <h1 class="my-0">Accounts</h1>
        <p class="text-slate-300 text-md leading-normal mt-2">
          Administer and manage your Ragnarok user accounts.
        </p>
      </div>
      <div class="ml-auto md:w-80">
        <el-input v-model="search" placeholder="Search" @input="handleSearch" />
      </div>
    </div>
    <div class="flex justify-end mb-8">
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="limit"
        :page-sizes="[5, 10, 30, 50, 100]"
        layout="sizes, prev, pager, next"
        :total="total"
        background
      />
    </div>
    <el-table
      v-loading="isLoading"
      :data="accounts"
      :default-sort="{ prop: 'id', order: 'descending' }"
      class="mb-6"
      style="width: 100%"
    >
      <el-table-column prop="userid" label="User" width="250" fixed sortable>
        <template #default="scope">
          <NuxtLink
            :to="`/admin/ragnarok/accounts/${scope.row.account_id}`"
            class="flex items-center space-x-4 text-gray-500 dark:text-gray-200"
          >
            <el-avatar
              :src="`https://ui-avatars.com/api/?name=${scope.row.userid}`"
            />
            <span>{{ scope.row.userid }}</span>
          </NuxtLink>
        </template>
      </el-table-column>
      <el-table-column
        prop="email"
        label="Email Address"
        width="300"
        sortable
      />
      <el-table-column prop="group" label="Group" width="200" sortable />
      <el-table-column
        prop="lastloginDate"
        label="Last login"
        width="266"
        sortable
      />
      <el-table-column prop="status" label="Status" width="100" sortable />
      <el-table-column prop="action" label="" width="100" fixed="right">
        <template #default="scope">
          <div class="flex justify-center">
            <el-dropdown
              size="default "
              @click="handleEdit(scope.$index, scope.row)"
            >
              <span class="cursor-pointer bold text-lg">
                <div class="i-tabler-dots"></div>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    @click="handleViewDetails(scope.row.account_id)"
                  >
                    <div class="i-tabler-pencil mr-2"></div>
                    Details
                  </el-dropdown-item>
                  <el-dropdown-item disabled
                    ><div class="i-tabler-trash mr-2"></div>
                    Delete</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-end">
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="limit"
        :page-sizes="[5, 10, 30, 50, 100]"
        layout="sizes, prev, pager, next"
        :total="total"
        background
      />
    </div>
  </div>
</template>
