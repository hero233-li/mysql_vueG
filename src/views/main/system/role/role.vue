<template>
  <div class="role">
    <header-search :search-config="roleSearchConfig" />
    <table-content :content-config="roleContentConfig" />
  </div>
</template>
<script setup lang="ts">
import roleSearchConfig from '@/views/main/system/role/config/role.search.config'
import roleContentConfig from '@/views/main/system/role/config/role.content.config'
</script>

<style scoped></style>
