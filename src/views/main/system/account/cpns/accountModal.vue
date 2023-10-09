<template>
  <div class="accountModal">
    <el-dialog
      v-model="centerDialogVisible"
      title="新建用户"
      width="23%"
      center
      draggable
      destroy-on-close
    >
      <div class="form">
        <el-form :model="DialogForm" label-width="60px" ref="formRef">
          <el-form-item label="用户名" prop="useraccount">
            <el-input
              v-model="DialogForm.useraccount"
              autocomplete="off"
              placeholder="请输入用户名：例如user"
            />
          </el-form-item>
          <el-form-item label="部门" prop="userdepartment">
            <el-select
              v-model="DialogForm.userdepartment"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartment" :key="item.department_id">
                <el-option :label="item.department_name" :value="item.department_id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="角色" prop="userrole">
            <el-select v-model="DialogForm.userrole" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in entireRole" :key="item.role_id">
                <el-option :label="item.role_name" :value="item.role_id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="昵称" prop="username">
            <el-input
              v-model="DialogForm.username"
              autocomplete="off"
              placeholder="请输入昵称：例如默认用户"
            />
          </el-form-item>
          <el-form-item label="手机号" prop="useriphone">
            <el-input v-model="DialogForm.useriphone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="邮箱" prop="useremail">
            <el-input v-model="DialogForm.useremail" autocomplete="off" />
          </el-form-item>
          <el-form-item label="备注" prop="userremark">
            <el-input v-model="DialogForm.userremark" autocomplete="off" />
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancelClick">取消</el-button>
          <el-button color="#119D90" @click="handleOKClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import DepartmentManageStore from '@/store/system/Department/Department'
import RoleManageStore from '@/store/system/Role/Role'
import { storeToRefs } from 'pinia'
import { ElForm } from 'element-plus'
import AccountManageStore from '@/store/system/Account/Account'

const departStore = DepartmentManageStore()
const { entireDepartment } = storeToRefs(departStore)
const roleStore = RoleManageStore()
const { entireRole } = storeToRefs(roleStore)

const formRef = ref<InstanceType<typeof ElForm>>()

let DialogForm = reactive<any>({
  uuid: '',
  useraccount: '',
  userdepartment: '',
  userrole: '',
  username: '',
  useremail: '',
  userremark: '',
  userpwd: '',
  useriphone: ''
})

const accountStore = AccountManageStore()

const centerDialogVisible = ref(false)
const handleCancelClick = () => {
  formRef.value?.resetFields()
  changeDialogVisible()
}
const handleOKClick = () => {
  if (DialogForm.uuid) {
    accountStore.editAccount(DialogForm)
  } else {
    accountStore.addAccount(DialogForm)
  }
  accountStore.queryAccountList()
  formRef.value?.resetFields()
  changeDialogVisible()
}

const changeDialogVisible = () => {
  centerDialogVisible.value = !centerDialogVisible.value
  for (const key in DialogForm) {
    DialogForm[key] = ''
  }
}
const updateDialogForm = (itemData) => {
  for (const key in itemData) {
    DialogForm[key] = itemData[key]
  }
}
defineExpose({ changeDialogVisible, updateDialogForm })
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.form {
  padding-right: 25px;
}
</style>
