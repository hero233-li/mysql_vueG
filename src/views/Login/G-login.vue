<template>
  <div class="G-login">
    <gl-login-panel></gl-login-panel>
  </div>
</template>
<script setup lang="ts">
import GlLoginPanel from '@/views/Login/GL-cpns/gl-login-panel.vue'
</script>
<style scoped>
.G-login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: url('@/assets/img/bg_logo.jpg') no-repeat;
  background-size: 100% 100%;
}
</style>
