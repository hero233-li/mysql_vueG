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
    <table-modal :modal-config="modalConfigRef" ref="tableModalRef" />
  </div>
</template>
<script setup lang="ts">
import departmentSearchConfig from '@/views/main/system/department/config/department.search.config'
import departmentContentConfig from '@/views/main/system/department/config/department.content.config'
import departmentModalConfig from '@/views/main/system/department/config/department.modal.config'
import headerSearch from '@/components/header-search/header-search.vue'
import tableContent from '@/components/table-content/table-content.vue'
import DepartmentManageStore from '@/store/system/Department/Department'
import useTableContent from '@/hooks/useTableContent'
const tableModalRef = ref()
const { tableContentRef, handleClickReset, handleClickSearch } = useTableContent()
const handleClickNewBtn = () => {
  tableModalRef.value?.changeDialogVisible()
}
const handleClickEditBtn = () => {
  console.log(122)
}
const modalConfigRef = computed(() => {
  const departmentStore = DepartmentManageStore()
  const departments = departmentStore.entireDepartmentGroup.map((item) => {
    return { label: item.department_name, value: item.department_group_id }
  })
  departmentModalConfig.formItems.forEach((item) => {
    if (item.prop === 'department_group_id') {
      item.selectOption.push(...departments)
    }
  })
  return departmentModalConfig
})
</script>
<style scoped></style>
