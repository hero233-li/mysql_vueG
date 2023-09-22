<template>
  <div class="G-main">
    <el-button type="primary" @click="Logout()">
      Upload<el-icon class="el-icon--right"><SwitchButton /></el-icon>
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { localCache } from '@/utils/catch'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'

function Logout() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/GLogin')
}
</script>
<style scoped>
.el-alert {
  margin: 20px 0 0;
}
.el-alert:first-child {
  margin: 0;
}
</style>
