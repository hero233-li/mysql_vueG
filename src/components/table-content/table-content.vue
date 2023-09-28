<template>
  <div class="table-content">
    <div class="table-title">
      <span>{{ contentConfig?.header?.title ?? '数据列表' }}</span>
      <div class="btn">
        <el-button type="primary" @click="handleClickNewAccount">
          <el-icon><Plus /></el-icon>
          <span>{{ contentConfig?.header?.btnTitle ?? '新建数据' }}</span>
        </el-button>
        <el-button @click="fetchAccountData">
          <el-icon><Refresh /></el-icon>
          <span>刷新数据</span>
        </el-button>
      </div>
    </div>
    <div class="table">
      <el-table style="width: 100%" :data="accountList">
        <template v-for="item in contentConfig.propList" :key="item.prop">
          <el-table-column v-bind="item" />
          <template v-if="(item.type = timer)">
            <el-table-column v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="accountTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import AccountManageStore from '@/store/Account/Account'
import type { ISearchFrom } from '@/types/system/account/account'

import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Check, Close, Delete, Edit, Hide, Plus, Refresh, View } from '@element-plus/icons-vue'
import { formatUTC } from '@/utils/timeFormate'
import RoleManageStore from '@/store/Role/Role'
const emit = defineEmits(['newBtnClick', 'EditAccountClick'])
interface IProps {
  contentConfig: {
    header?: {
      title?: string
      btnTitle?: string
    }
    propList: any[]
  }
}
const props = defineProps<IProps>()
const dataPerPage = ref(10)
const fewPages = ref(0)
let searchFromData: ISearchFrom = {
  username: '',
  useraccount: '',
  useriphone: '',
  useremail: '',
  userrole: '',
  userstate: '',
  limit: 10,
  offset: 0
}
//请求数据
const accountStore = AccountManageStore()
const pageSize = ref(10)
const fetchAccountData = (formData: any = {}) => {
  searchFromData.username = formData.username ?? ''
  searchFromData.useraccount = formData.useraccount ?? ''
  searchFromData.useriphone = formData.userIphone ?? ''
  searchFromData.useremail = formData.useremail ?? ''
  searchFromData.userstate = formData.userState ?? ''
  accountStore.queryAccountList(searchFromData)
}
accountStore.queryAccountList(searchFromData)

defineExpose({ fetchAccountData })

//获取数据展示
const { accountList, accountTotalCount } = storeToRefs(accountStore)
const value1 = ref(true)
const currentPage = ref(1)
const changeStatus = (item) => {
  item.userstate = item.userstate === 0 ? 1 : 0
  console.log(item.userstate)
  accountStore.changeStatus(item)
}
const handleSizeChange = () => {
  searchFromData.limit = pageSize.value
  fetchAccountData()
}
const handleCurrentChange = () => {
  searchFromData.offset = (currentPage.value - 1) * pageSize.value
  fetchAccountData()
}
const handleClickDelete = (item) => {
  accountStore.removeAccount(item)
  fetchAccountData()
}

const handleClickNewAccount = () => {
  emit('newBtnClick')
}
const handleClickEditAccount = (item) => {
  emit('EditAccountClick', item)
}
const roleStore = RoleManageStore()
const userrolePromiseResolved = false

const queryRoleName = async (item) => {
  const result = await roleStore.queryRoleName(item)
  console.log(result)
  return result
}
</script>

<style scoped>
.table-content {
  background-color: rgb(255, 255, 255);
  border-radius: 2px;
  box-sizing: border-box;
  max-width: 100%;
  padding: 6px;
}

div.table-title {
  display: flex;
  justify-content: space-between;
}
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
