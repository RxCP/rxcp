<script lang="ts" setup>
import { head } from 'ramda';
import { reactive } from 'vue';
import {
  ElButton,
  ElForm,
  ElInput,
  ElFormItem,
  ElLink,
  ElMessage
} from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { getUser, login } from '@/api/auth.api';

definePageMeta({
  layout: 'centered-form',
  middleware: ['guest'],
});

const { setAccessToken, setAuthUser } = useAuthStore();
const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const form = reactive({
  email: '',
  password: ''
});

const rules = reactive<FormRules>({
  email: [
    { required: true, message: 'This field is required', trigger: 'blur' },
    {
      type: 'email',
      required: true,
      message: 'Invalid email',
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: 'This field is required', trigger: 'blur' }
  ]
});

let isSubmitting = ref<Boolean>(false);

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl || isSubmitting.value) return;

  isSubmitting.value = true;

  await formEl.validate(async (valid, fields) => {
    if (!valid) {
      isSubmitting.value = false;
      return;
    }

    const [data, error, status] = await login
      .setData({
        email: form.email,
        password: form.password
      })
      .send();

    if (status !== 200) {
      ElMessage.error(head(error?.errors || ['Server error']));
      isSubmitting.value = false;
      return;
    }

    /* SUCESS */
    // save token to store
    setAccessToken(data?.token);

    // get user authenticated details
    const [authData, _, authStatus] = await getUser.send();

    // then save to store
    if (authStatus === 200) {
      setAuthUser(authData?.data);
      router.push({ path: '/admin' });
    } else {
      ElMessage.error('Invalid user');
    }

    isSubmitting.value = false;
  });
}
</script>

<template>
  <Head>
    <Title>Login</Title>
  </Head>
  <h1 class="text-xl font-bold mt-0 mb-6 text-center">Sign In</h1>
  <el-form ref="ruleFormRef" :model="form" :rules="rules">
    <el-form-item prop="email">
      <el-input
        v-model="form.email"
        type="email"
        placeholder="Email Address"
        required
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        type="password"
        placeholder="Password"
        required
      />
    </el-form-item>
    <el-form-item class="mt-8">
      <el-button
        native-type="submit"
        type="primary"
        class="w-full"
        :loading="isSubmitting"
        @click="submitForm(ruleFormRef)"
      >
        Sign In
      </el-button>
    </el-form-item>
    <el-link type="primary" :underline="false" class="text-center w-full">
      Forgot password ?
    </el-link>
  </el-form>
</template>
