<template>
  <div class="department">
    <header-search :search-config="departmentSearchConfig" />
    <table-content :content-config="departmentContentConfig" />
  </div>
</template>
<script setup lang="ts">
import departmentSearchConfig from '@/views/main/system/department/config/department.search.config'
import departmentContentConfig from '@/views/main/system/department/config/department.content.config'
</script>
<style scoped></style>
