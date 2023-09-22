<template>
  <div class="G-main">
    <template>
      <div class="common-layout">
        <el-container>
          <el-aside width="200px" height="100vh">
            <Aside />
          </el-aside>
          <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
          </el-container>
        </el-container>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import Aside from '@/views/main/Aside/Aside.vue'
</script>
<style scoped></style>
