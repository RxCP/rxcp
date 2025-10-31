<script setup>
import { Field, Form } from 'vee-validate'
import { object, string } from 'yup'
import { ElButton, ElInput, ElFormItem, ElLink, ElMessage } from 'element-plus'

definePageMeta({
  layout: 'centered-form',
  middleware: ['guest']
})

const { postLogin, getAuthUser } = useApi()
const { setAccessToken, setAuthUser } = useAuthStore()
const router = useRouter()

// State
const isSubmitting = ref(false)
const formSchema = object({
  email: string().email().required().label('Email'),
  password: string().required().label('Password')
})

async function onSubmit(values) {
  isSubmitting.value = true

  const [data, resError, status] = await postLogin.setData(values).send()

  if (![401, 422, 200].includes(status)) {
    ElMessage({
      showClose: true,
      message: `We're sorry, but there seems to be a server error. Please try again later or contact support for assistance.`,
      type: 'error',
      duration: 5000
    })

    isSubmitting.value = false
    return
  }

  if (resError) {
    ElMessage({
      showClose: true,
      message: resError.errors[0].message,
      type: 'error'
    })

    isSubmitting.value = false
    return
  }

  /* SUCESS */
  // save token to store
  setAccessToken(data?.token)

  // get user authenticated details
  const [authData, _, authStatus] = await getAuthUser.send()

  // then save to store
  if (authStatus === 200) {
    setAuthUser(authData?.data)
    router.push({ path: '/admin' })
  } else {
    ElMessage({
      showClose: true,
      message:
        'Access to this account has been restricted. Please contact an administrator for further assistance.',
      duration: 5000,
      type: 'error'
    })
  }

  isSubmitting.value = false
}
</script>

<template>
  <Head>
    <Title>Login</Title>
  </Head>
  <h1 class="text-xl font-bold mt-0 mb-6 text-center">Sign In</h1>
  <Form
    :validation-schema="formSchema"
    class="el-form el-form--default el-form--label-top"
    @submit="onSubmit"
  >
    <Field name="email" v-slot="{ value, field, errorMessage }">
      <el-form-item :error="errorMessage">
        <el-input
          type="email"
          placeholder="Email Address"
          v-bind="field"
          :validate-event="false"
          :model-value="value"
        />
      </el-form-item>
    </Field>
    <Field name="password" v-slot="{ value, field, errorMessage }">
      <el-form-item :error="errorMessage">
        <el-input
          type="password"
          placeholder="Password"
          v-bind="field"
          :validate-event="false"
          :model-value="value"
        />
      </el-form-item>
    </Field>
    <el-form-item class="mt-8">
      <el-button
        type="primary"
        native-type="submit"
        class="w-full"
        :loading="isSubmitting"
      >
        {{ isSubmitting ? 'Signing In...' : 'Sign In' }}
      </el-button>
    </el-form-item>
    <el-link type="primary" :underline="false" class="text-center w-full">
      Forgot password ?
    </el-link>
  </Form>
</template>
