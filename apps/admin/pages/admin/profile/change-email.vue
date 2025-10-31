<script setup>
import { ElButton, ElAlert, ElForm, ElInput, ElFormItem } from 'element-plus'
</script>

<template>
  <div class="flex mb-8">
    <div>
      <h1 class="my-0">Email Address</h1>
      <p
        class="text-gray-400 dark:text-slate-300 text-md mt-2 mb-0 leading-normal"
      >
        Change the email address associated with your account to ensure that you
        receive all account-related communication.
      </p>
    </div>
  </div>
  <div>
    <el-form label-position="top">
      <div class="grid md:grid-cols-2 gap-4">
        <el-form-item label="Current Email Address">
          <el-input readonly />
        </el-form-item>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <el-form-item label="New Email Address">
          <el-input readonly />
        </el-form-item>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <el-alert
          title="To ensure account security, please provide your password in order to change your email address."
          type="info"
          :closable="false"
          show-icon
          class="mb-4"
        />
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <el-form-item label="Password">
          <el-input type="password" readonly />
        </el-form-item>
      </div>
      <div class="text-right mt-8">
        <el-button type="primary"> Update Email Address </el-button>
      </div>
    </el-form>
  </div>
</template>
