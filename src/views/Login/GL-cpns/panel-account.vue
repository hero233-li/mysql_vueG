<template>
  <div class="account-panel">
    <el-form
      ref="AccountFormRef"
      :model="LoginForm"
      label-width="auto"
      :label-position="labelPosition"
      :size="size"
      :rules="rules"
    >
      <el-form-item prop="account">
        <el-input
          placeholder="输入手机或邮箱"
          v-model="LoginForm.account"
          :prefix-icon="UserFilled"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="输入密码"
          v-model="LoginForm.password"
          :prefix-icon="Lock"
        />
      </el-form-item>
    </el-form>
    <div class="clear-fix">
      <el-checkbox v-model="RememberMe" label="记住我" size="large" />
    </div>
    <div class="oblivionPwd">
      <el-link type="primary">忘记密码</el-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Lock, UserFilled } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import useLoginStore from '@/store/Login/login'
import type { IAccountLoginForm } from '@/types/Login/login'
import { localCache } from '@/utils/catch'
import { ACCOUNT, PASSWORD, REMEMBERME } from '@/global/constants'
const size = ref('large')
const labelPosition = ref('right')

const AccountFormRef = ref<FormInstance>()

const LoginForm = reactive<IAccountLoginForm>({
  account: localCache.getCache(ACCOUNT) ?? '',
  password: localCache.getCache(PASSWORD) ?? ''
})

const rules = reactive<FormRules<IAccountLoginForm>>({
  account: [
    { required: true, message: '输入手机或邮箱', trigger: 'blur' }
    // {
    //   pattern:
    //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //   message: '请输入邮箱',
    //   trigger: 'blur'
    // }
  ],
  password: [{ required: true, message: '输入密码', trigger: 'blur' }]
})

const RememberMe = ref<boolean>(localCache.getCache(REMEMBERME) ?? false)
const loginStore = useLoginStore()
watch(RememberMe, (newValue) => {
  localCache.setCache(REMEMBERME, newValue)
})
const LoginActive = () => {
  console.log('账号登录')
  AccountFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('ok')
      const account = LoginForm.account
      const iphoneReg =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/
      let emailReg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      console.log(iphoneReg.test(account))
      const password = LoginForm.password
      if (iphoneReg.test(account)) {
        const iphone = account
        console.log(iphone)
        loginStore.LoginIphoneAction({ iphone, password }).then((res) => {
          if (RememberMe.value) {
            localCache.setCache(ACCOUNT, account)
            localCache.setCache(PASSWORD, password)
          } else {
            localCache.removeCache(ACCOUNT)
            localCache.removeCache(PASSWORD)
          }
        })
      } else {
        loginStore.LoginAccountAction({ account, password }).then((res) => {
          if (RememberMe.value) {
            localCache.setCache(ACCOUNT, account)
            localCache.setCache(PASSWORD, password)
          } else {
            localCache.removeCache(ACCOUNT)
            localCache.removeCache(PASSWORD)
          }
        })
      }
    } else {
      console.log('error')
    }
  })
}
defineExpose({
  LoginActive
})
</script>

<style scoped></style>
