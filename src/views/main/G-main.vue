<template>
  <div class="G-main">
    <div class="common-layout">
      <el-container>
        <el-aside :width="isCollapse ? '3%' : '10%'">
          <main-menu :isCollapse="isCollapse" />
        </el-aside>
        <el-container>
          <el-header height="48px">
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
<style scoped></style>
