<template>
  <div class="department">
    <header-search
      :search-config="departmentSearchConfig"
      @searchClick="handleClickSearch"
      @clearClick="handleClickReset"
    />

    <table-content
      :content-config="departmentContentConfig"
      ref="tableContentRef"
      @new-btn-click="handleClickNewBtn"
      @EditAccountClick="handleClickEditBtn"
    >
      <template #departmentName="scope">
        <span class="name"> 客制化{{ scope.row[scope.prop] }}</span>
      </template>
    </table-content>
    <table-modal :modal-config="departmentModalConfig" ref="tableModalRef" />
  </div>
</template>
<script setup lang="ts">
import departmentSearchConfig from '@/views/main/system/department/config/department.search.config'
import departmentContentConfig from '@/views/main/system/department/config/department.content.config'
import departmentModalConfig from '@/views/main/system/department/config/department.modal.config'
import headerSearch from '@/components/header-search/header-search.vue'
import tableContent from '@/components/table-content/table-content.vue'
const tableContentRef = ref()
const tableModalRef = ref()
const handleClickSearch = () => {
  console.log(111)
}
const handleClickReset = () => {
  console.log(111)
}
const handleClickNewBtn = () => {
  tableModalRef.value?.changeDialogVisible()
}
const handleClickEditBtn = () => {
  console.log(122)
}
</script>
<style scoped></style>
