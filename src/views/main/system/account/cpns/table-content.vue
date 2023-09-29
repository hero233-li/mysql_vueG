<template>
  <div class="table-content">
    <div class="table-title">
      <span>用户列表</span>
      <div class="btn">
        <el-button type="primary" @click="handleClickNewAccount">
          <el-icon><Plus /></el-icon>
          <span>新建用户</span>
        </el-button>
        <el-button @click="fetchAccountData">
          <el-icon><Refresh /></el-icon>
          <span>刷新数据</span>
        </el-button>
      </div>
    </div>
    <div class="table">
      <el-table style="width: 100%" :data="accountList">
        <el-table-column fixed type="index" align="center" label="序号" width="100" />
        <el-table-column align="center" prop="useraccount" label="用户名" width="100" />
        <el-table-column prop="username" align="center" label="昵称" width="150" />
        <el-table-column prop="useremail" align="center" label="邮箱" width="200" />
        <el-table-column prop="useriphone" align="center" label="手机号" width="200" />
        <el-table-column prop="createTime" align="center" label="创建时间" width="200">
          <template #default="scope">
            {{ formatUTC(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="userrole" align="center" label="账号角色" width="200">
          <template #default="scope">
            {{ roleNames[scope.row.userrole] }}
          </template>
        </el-table-column>

        <el-table-column prop="userstate" align="center" label="账号状态" width="150">
          <template #default="scope">
            <!-- 如果插槽的值为 el-switch，第一次加载会默认触发 switch 的 @change 方法，所有在外层包一个盒子，点击触发盒子 click 方法（暂时只能这样解决） -->
            <div @click="changeStatus(scope.row)">
              <el-switch
                :model-value="scope.row.userstate"
                :active-text="scope.row.userstate === 1 ? '启用' : '禁用'"
                :active-value="1"
                :inactive-value="0"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作">
          <template #default="scope">
            <el-button :icon="Edit" size="small" text @click="handleClickEditAccount(scope.row)">
              编辑
            </el-button>

            <el-button :icon="Refresh" size="small" text>重置密码</el-button>
            <el-button
              type="danger"
              :icon="Delete"
              size="small"
              text
              @click="handleClickDelete(scope.row.uuid)"
              >删除</el-button
            >
          </template>
        </el-table-column>
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
import AccountManageStore from '@/store/system/Account/Account'
import type { ISearchFrom } from '@/types/system/account/account'

import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Check, Close, Delete, Edit, Hide, Plus, Refresh, View } from '@element-plus/icons-vue'
import { formatUTC } from '@/utils/timeFormate'
import RoleManageStore from '@/store/system/Role/Role'
import login from '@/store/Login/login'
const emit = defineEmits(['newBtnClick', 'EditAccountClick'])

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

const roleNames: [] = ref({})
// const loadRoleNames = async () => {
//   const roleName = await roleStore.queryRoleName() // 替换为正确的获取角色名称的函数
//   for (let key = 0, i = 0; i < roleName.length; ) {
//     const id = roleName[i].role_id
//     const name = roleName[i].role_name
//     if (id === key) {
//       i++
//       roleNames.value[key] = name
//     } else {
//       key++
//       roleNames.value[key] = ''
//     }
//   }
// }
// onMounted(async () => {
//   // 在组件挂载后加载角色名称
//   await loadRoleNames()
// })
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
