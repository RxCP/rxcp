<script setup>
import { Field, Form } from 'vee-validate'
import { object, string } from 'yup'
import { ElButton, ElInput, ElFormItem, ElMessage } from 'element-plus'

const { authUser, setAuthUser } = useAuthStore()
const { patchProfile } = useApi()

const isSubmitting = ref(false)
const formSchema = object({
  first_name: string().required().label('First Name'),
  last_name: string().required().label('Last Name')
})

async function onSubmit(values, actions) {
  isSubmitting.value = true

  const [res, errors, status] = await patchProfile.setData(values).send()

  isSubmitting.value = false

  if (![422, 201].includes(status)) {
    ElMessage({
      showClose: true,
      message: `We're sorry, but there seems to be a server error. Please try again later or contact support for assistance.`,
      type: 'error',
      duration: 5000
    })

    return
  }

  // Show floating alert and error to each fields
  if (errors) {
    ElMessage({
      showClose: true,
      message: `Please check all fields and make sure you've provided all necessary information.`,
      type: 'error'
    })

    for (const error of errors.errors) {
      actions.setFieldError(error.field, error.message)
    }

    return
  }

  // Reflect the user info to the site realtime
  setAuthUser(res.data)
  // Show success message
  ElMessage({
    showClose: true,
    message: `Profile updated successfully!`,
    type: 'success'
  })
}
</script>

<template>
  <div class="flex mb-8">
    <div>
      <h1 class="my-0">Profile Information</h1>
      <p class="text-gray-400 dark:text-slate-300 text-lg mt-2 mb-0">
        Manage your profile information.
      </p>
    </div>
  </div>
  <div>
    <Form
      :validation-schema="formSchema"
      class="el-form el-form--default el-form--label-top"
      @submit="onSubmit"
    >
      <div class="grid md:grid-cols-2 gap-4">
        <Field
          name="first_name"
          :value="authUser.first_name"
          v-slot="{ value, field, errorMessage }"
        >
          <el-form-item :error="errorMessage" label="First Name" required>
            <el-input
              placeholder="First Name"
              v-bind="field"
              :validate-event="false"
              :model-value="value"
            />
          </el-form-item>
        </Field>
        <Field
          name="last_name"
          :value="authUser.last_name"
          v-slot="{ value, field, errorMessage }"
        >
          <el-form-item :error="errorMessage" label="Last Name" required>
            <el-input
              placeholder="Last Name"
              v-bind="field"
              :validate-event="false"
              :model-value="value"
            />
          </el-form-item>
        </Field>
      </div>
      <div class="text-right mt-8">
        <el-button type="primary" native-type="submit" :loading="isSubmitting">
          <span v-show="!isSubmitting">Update Profile</span>
          <span v-show="isSubmitting">Please wait...</span>
        </el-button>
      </div>
    </Form>
  </div>
</template>
