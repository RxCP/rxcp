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
// import { getUsers } from '~/api/users'
import { format, parseISO } from 'date-fns'

definePageMeta({
  middleware: ['auth']
})
useHead({
  title: 'Ragnarok Users'
})

const router = useRouter()
const { $api } = useNuxtApp()
const {
  limit,
  page,
  total,
  items,
  isLoading,
  search,
  handleSearch,
  setSearchCallback
} = await usePagination($api.users.getUsers)

setSearchCallback((searchText) => {
  return {
    or: [
      {
        email: {
          like: searchText
        }
      },
      {
        first_name: {
          like: searchText
        }
      },
      {
        last_name: {
          like: searchText
        }
      }
    ]
  }
})

const users = computed(() => {
  return items.value.map((item) => {
    return {
      ...item,
      ...{
        fullName: `${item.first_name} ${item.last_name}`,
        email: item.email,
        role: item.roles.map((role) => role.name),
        registered: format(parseISO(item.created_at), 'MM/dd/yyyy')
      }
    }
  })
})

function handleViewDetails(id) {
  router.push(`/admin/ragnarok/users/${id}`)
}
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded p-8">
    <div class="flex flex-col md:flex-row mb-6">
      <div>
        <h1 class="my-0">Users</h1>
        <p class="text-slate-300 text-md mt-2 leading-normal">
          Administer and manage your user accounts.
        </p>
      </div>
      <div class="md:ml-auto md:w-80">
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
      :data="users"
      :default-sort="{ prop: 'id', order: 'descending' }"
      class="mb-6"
      style="width: 100%"
    >
      <el-table-column prop="fullName" label="User" width="350" fixed sortable>
        <template #default="scope">
          <NuxtLink
            :to="`/admin/ragnarok/users/${scope.row.id}`"
            class="flex items-center space-x-4 text-gray-500 dark:text-gray-200"
          >
            <el-avatar
              :src="`https://ui-avatars.com/api/?name=${scope.row.fullName}`"
            />
            <span>{{ scope.row.fullName }}</span>
          </NuxtLink>
        </template>
      </el-table-column>
      <el-table-column
        prop="email"
        label="Email Address"
        width="300"
        sortable
      />
      <el-table-column prop="role" label="Role" width="200" sortable />
      />
      <el-table-column
        prop="registered"
        label="Date Registered"
        width="266"
        sortable
      />
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
                  <el-dropdown-item @click="handleViewDetails(scope.row.id)">
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
