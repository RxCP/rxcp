<script setup>
import { ElButton, ElForm, ElInput, ElFormItem } from 'element-plus'
</script>

<template>
  <div class="flex mb-6">
    <div>
      <h1 class="my-0">Email Address</h1>
      <p class="text-gray-400 dark:text-slate-300 text-lg mt-2">
        Change your email address.
      </p>
    </div>
  </div>
  <div>
    <el-form label-position="top">
      <div class="grid md:grid-cols-2 gap-4">
        <el-form-item label="Email Address">
          <el-input readonly />
        </el-form-item>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <el-form-item label="Password">
          <el-input type="password" readonly />
        </el-form-item>
      </div>
      <div class="text-right mt-8">
        <el-button type="primary"> Save </el-button>
      </div>
    </el-form>
  </div>
</template>
