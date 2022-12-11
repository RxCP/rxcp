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
import { getUsers } from '~/api/users'
import { format, parseISO } from 'date-fns'

let items = reactive([])
const isLoading = ref(true)
const currentPage = ref(1)
const pageSize = ref(100)
const search = ref('')

definePageMeta({
  middleware: ['auth']
})

useHead({
  title: 'Ragnarok Users'
})

onMounted(async () => {
  const { data } = await fetchUsers()
  console.log(data)
  items = data.map((item) => {
    return {
      user: {
        name: `${item.first_name} ${item.last_name}`
      },
      email: item.email,
      role: item.roles.map((role) => role.name),
      registered: format(parseISO(item.created_at), 'MM/dd/yyyy')
    }
  })
  isLoading.value = false
})

async function fetchUsers() {
  const [data, error, status] = await getUsers.send()
  if (status !== 200) {
    console.warn(error)
    return
  }
  return data
}

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded p-8">
    <div class="flex mb-6">
      <div>
        <h1 class="my-0">Users</h1>
        <p class="text-slate-300 text-lg mt-2">Manage ragnarok users.</p>
      </div>
      <div class="ml-auto md:w-80">
        <el-input v-model="search" placeholder="Search" />
      </div>
    </div>
    <div class="flex justify-end mb-8">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[100, 200, 300, 400]"
        layout="sizes, prev, pager, next"
        :total="1000"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-table
      v-loading="isLoading"
      :data="items"
      :default-sort="{ prop: 'id', order: 'descending' }"
      class="mb-6"
      style="width: 100%"
    >
      <el-table-column prop="user" label="User" width="350" fixed sortable>
        <template #default="scope">
          <div class="flex items-center space-x-4">
            <el-avatar
              :src="`https://ui-avatars.com/api/?name=${scope.row.user.name}`"
            />
            <span>{{ scope.row.user.name }}</span>
          </div>
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
      <el-table-column prop="action" label="" width="100">
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
                    ><div class="i-tabler-pencil mr-2"></div>
                    Details</el-dropdown-item
                  >
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
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[100, 200, 300, 400]"
        layout="sizes, prev, pager, next"
        :total="1000"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
