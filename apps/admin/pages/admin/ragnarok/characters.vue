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
  title: 'Ragnarok Characters'
})

const { $api } = useNuxtApp()
const { limit, page, total, items, isLoading, search, handleSearch } =
  await usePagination($api.characters.getCharacters)

const accounts = computed(() => {
  return items.value.map((item) => {
    return {
      ...item,
      account: item?.account?.userid,
      lastloginDate:
        item.last_login && format(parseISO(item.last_login), 'MM/dd/yyyy h:m a')
    }
  })
})
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded p-8">
    <div class="flex mb-6">
      <div>
        <h1 class="my-0">Characters</h1>
        <p class="text-slate-300 text-md leading-normal mt-2">
          Administer and manage your Ragnarok characters.
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
      <el-table-column prop="char_id" label="Char ID" width="150" sortable />
      <el-table-column prop="name" label="Name" width="250" sortable fixed>
        <template #default="scope">
          <div class="flex items-center space-x-4">
            <el-avatar
              :src="`https://ui-avatars.com/api/?name=${scope.row.name}`"
            />
            <span>{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="account" label="Account" width="150" sortable />
      <el-table-column prop="class_name" label="Class" width="150" sortable />
      <el-table-column
        prop="base_level"
        label="Base level"
        width="120"
        sortable
      />
      <el-table-column
        prop="job_level"
        label="Job level"
        width="120"
        sortable
      />
      <el-table-column
        prop="lastloginDate"
        label="Last login"
        width="180"
        sortable
      />
      <el-table-column prop="zeny" label="Zeny" width="100" sortable />
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
                  <el-dropdown-item>
                    <div class="i-tabler-pencil mr-2"></div>
                    Details
                  </el-dropdown-item>
                  <el-dropdown-item disabled>
                    <div class="i-tabler-trash mr-2"></div>
                    Delete
                  </el-dropdown-item>
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
