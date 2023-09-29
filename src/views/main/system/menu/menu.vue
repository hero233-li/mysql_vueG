<template>
  <div class="menu">
    <header-search :search-config="menuSearchConfig" />
    <table-content :content-config="menuContentConfig" />
  </div>
</template>
<script setup lang="ts">
import menuSearchConfig from '@/views/main/system/menu/config/menu.search.config'
import menuContentConfig from '@/views/main/system/menu/config/menu.content.config'
</script>
<style scoped></style>
