<template>
  <div class="G-main">
    <div class="common-layout">
      <el-container>
        <el-aside class="elSide" :width="isCollapse ? '3%' : '10%'">
          <main-menu :isCollapse="isCollapse" />
        </el-aside>
        <el-container>
          <el-header class="el-header" height="48px">
            <Header @flodChange="handFoldChange" />
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/main-header/mainHeader.vue'
const isCollapse = ref(false)
const handFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>
<style scoped>
.elSide {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  background-color: #faf7fa;
}
.el-header {
  position: relative;
  width: 100%;
  height: 60px;
}
</style>
