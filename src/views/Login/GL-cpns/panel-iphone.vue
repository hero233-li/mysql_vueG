<template>
  <div class="iphone-panel">
    <el-form
      ref="IphoneFormRef"
      :model="LoginForm"
      label-width="auto"
      :label-position="labelPosition"
      :rules="IphoneRules"
      :size="size"
    >
      <el-form-item prop="iphone">
        <el-input
          max="11"
          min="11"
          placeholder="输入手机号"
          v-model="LoginForm.iphone"
          :prefix-icon="Cellphone"
        />
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input placeholder="输入验证码" v-model="LoginForm.captcha" :prefix-icon="Lock" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { Cellphone, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { type FormInstance, type FormRules } from 'element-plus'
import { iphoneLoginRequest } from '@/service/Login/login'
import useLoginStore from '@/store/Login/login'
import type { IIphoneLoginForm } from '@/types/Login/login'
const size = ref('large')
const labelPosition = ref('right')

const IphoneFormRef = ref<FormInstance>()

const LoginForm = reactive<IIphoneLoginForm>({
  iphone: '',
  captcha: ''
})

const IphoneRules = reactive<FormRules<IIphoneLoginForm>>({
  iphone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern:
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
      message: '请输入正确手机号',
      trigger: 'blur'
    }
  ],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})
const openSuccess = () => {
  ElMessage({
    showClose: true,
    message: '准备登录中.',
    type: 'success'
  })
}
const openError = () => {
  ElMessage({
    showClose: true,
    message: '信息填写错误',
    type: 'error'
  })
}
const loginStore = useLoginStore()
const loginActive = () => {
  console.log('手机号登录')
  IphoneFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('ok')
      const iphone = LoginForm.iphone
      const captcha = LoginForm.captcha
      loginStore.LoginIphoneAction({ iphone, captcha })
    } else {
      console.log('error')
      openError()
    }
  })
}
defineExpose({
  loginActive
})
</script>

<style scoped></style>
