<template>
  <div class="gl-login-panel">
    <main>
      <div class="login-top">
        <h1>登录你的后台账户</h1>
        <div class="enroll">
          <span> 没有账户？ </span>
          <div class="SignUpForFree">
            免费注册
            <el-icon><Promotion /></el-icon>
          </div>
        </div>
      </div>

      <div class="login-area">
        <el-tabs v-model="activeName" type="card" class="demo-tabs">
          <el-tab-pane label="帐号密码登录" name="account">
            <panel-account ref="accountRef" />
          </el-tab-pane>
          <el-tab-pane label="手机验证码登录" name="iphone">
            <panel-iphone ref="iphoneRef" />
          </el-tab-pane>
        </el-tabs>

        <div class="login-button">
          <el-button type="primary" style="width: 100%" size="large" @click="loginBtn"
            >登录</el-button
          >
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import PanelIphone from '@/views/Login/GL-cpns/panel-iphone.vue'

const activeName = ref('account')
import { ref } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import PanelAccount from '@/views/Login/GL-cpns/panel-account.vue'
const iphoneRef = ref<InstanceType<typeof PanelIphone>>()
const accountRef = ref<InstanceType<typeof PanelAccount>>()
const loginBtn = () => {
  if (activeName.value === 'iphone') {
    iphoneRef.value?.loginActive()
  } else {
    accountRef.value?.LoginActive()
  }
}
</script>
<style scoped>
.gl-login-panel {
  background-color: rgb(255, 255, 255);
  border-radius: 22px;
  box-shadow:
    rgba(23, 25, 29, 0.2) 0px 16px 16px -16px,
    rgba(23, 25, 29, 0.03) 0px 14px 20px 0px,
    rgba(23, 25, 29, 0.04) 0px 0px 0px 1px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  transform: matrix(1, 0, 0, 1, 0, 0);
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.83, 0, 0.17, 1);
  user-select: text;
}
main {
  box-sizing: border-box;
  margin: 46px;
  overflow: hidden;
  padding: 13px;
  position: relative;
  user-select: text;
}
/**
登录页头部
 */
.login-top {
  box-sizing: border-box;
  margin: 0px 0px 52px;
  transform: matrix(1, 0, 0, 1, 0, 0);
  user-select: text;
}
h1 {
  box-sizing: border-box;
  color: rgb(36, 48, 66);
  font-family: SourceHanSansCN_Bold;
  font-size: 37px;
  line-height: 37px;
  margin: 0px 0px 22px;
  user-select: text;
  -webkit-font-smoothing: antialiased;
}
.enroll {
  box-sizing: border-box;
  display: flex;
  user-select: text;
}
span {
  box-sizing: border-box;
  color: rgb(36, 48, 66);
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Microsoft JhengHei', 黑体, arial, STHeiti, 宋体;
  font-size: 15px;
  line-height: 21px;
  opacity: 0.7;
  user-select: text;
  -webkit-font-smoothing: antialiased;
}
.SignUpForFree {
  align-items: center;
  box-sizing: border-box;
  color: rgb(0, 142, 250);
  display: flex;
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Microsoft JhengHei', 黑体, arial, STHeiti, 宋体;
  font-size: 15px;
  font-weight: 500;
  line-height: 21px;
  place-items: center normal;
  text-decoration: underline solid rgb(0, 142, 250);
  transition-duration: 0.25s;
  transition-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
  user-select: none;
  -webkit-font-smoothing: antialiased;
}
/**
登录页主内容
 */
.login-area {
  box-sizing: border-box;
  transition-duration: 0.25s;
  transition-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
  user-select: text;
}
.login-button {
  box-sizing: border-box;
  display: flex;
  margin: 22px 0px 0px;
  user-select: text;
}
</style>
