<template>
  <div class="account">
    <header-search @queryClick="handleClickSearch" @reset-click="handleClickReset" />
    <table-content
      ref="tableContentRef"
      @new-btn-click="handleClickNewBtn"
      @EditAccountClick="handleClickEditBtn"
    />
    <account-modal ref="accountModalRef" />
  </div>
</template>
<script setup lang="ts">
import TableContent from '@/views/main/system/account/cpns/table-content.vue'
import HeaderSearch from '@/views/main/system/account/cpns/header-search.vue'
import AccountModal from '@/views/main/system/account/cpns/accountModal.vue'
const handleClickSearch = (fromData: any) => {
  tableContentRef.value?.fetchAccountData(fromData)
}
const handleClickEditBtn = (item) => {
  accountModalRef.value?.changeDialogVisible()
  accountModalRef.value?.updateDialogForm(item)
}
const handleClickNewBtn = () => {
  accountModalRef.value?.changeDialogVisible()
}
const handleClickReset = (fromData: any) => {
  tableContentRef.value?.fetchAccountData(fromData)
}
const tableContentRef = ref()
const accountModalRef = ref()
</script>
<style scoped></style>
