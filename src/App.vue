<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const locale = zhCn
</script>
<style scoped>
.app {
  height: 100vh;
  width: 100vw;
}
</style>
