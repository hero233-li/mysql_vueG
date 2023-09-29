<template>
  <div class="accountModal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="23%"
      center
      draggable
      destroy-on-close
    >
      <div class="form">
        <el-form :model="DialogForm" label-width="60px" ref="formRef">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="DialogForm.useraccount" v-bind="item" />
              </template>
            </el-form-item>
          </template>
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
interface IProp {
  modalConfig: {
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
}
const isNewRef = ref(false)
const props = defineProps<IProp>()
const formRef = ref<InstanceType<typeof ElForm>>()

const initialForm: any = {}
for (const item of props.modalConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
let DialogForm = reactive<any>(initialForm)

const accountStore = AccountManageStore()

const centerDialogVisible = ref(false)
const handleCancelClick = () => {
  formRef.value?.resetFields()
  changeDialogVisible()
}
const handleOKClick = () => {
  if (DialogForm.uuid) {
    console.log(DialogForm.uuid)
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
