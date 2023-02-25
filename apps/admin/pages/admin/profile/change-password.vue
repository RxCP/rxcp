<script setup>
import { ElButton, ElForm, ElInput, ElFormItem } from 'element-plus'
</script>

<template>
  <div class="flex mb-8">
    <div>
      <h1 class="my-0">Change Password</h1>
      <p
        class="text-gray-400 dark:text-slate-300 text-md mt-2 mb-0 leading-normal"
      >
        Update your account security by changing your password. Choose a strong
        and memorable password to ensure your information is safe.
      </p>
    </div>
  </div>
  <div>
    <el-form label-position="top">
      <div class="grid md:grid-cols-2 gap-4">
        <el-form-item label="New Password">
          <el-input type="password" readonly />
        </el-form-item>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <el-form-item label="Repeat New Password">
          <el-input type="password" readonly />
        </el-form-item>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <el-form-item label="Current Password">
          <el-input type="password" readonly />
        </el-form-item>
      </div>
      <div class="text-right mt-8">
        <el-button type="primary"> Update Password </el-button>
      </div>
    </el-form>
  </div>
</template>
