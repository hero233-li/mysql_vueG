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
              <template v-else-if="item.type === 'select'">
                <el-select placeholder="请选择" v-model="DialogForm[item.prop]">
                  <template v-for="element in item.selectOption" :key="element.value">
                    <el-option :label="element.label" :value="element.value" />
                  </template>
                </el-select>
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
import SystemManageStore from '@/store/system/system'

/**
 *todo！当前最优先的任务，完善新建页面和编辑页面的功能
 */
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
    pageName: string
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
const systemStore = SystemManageStore()

const accountStore = AccountManageStore()

const centerDialogVisible = ref(false)
const handleCancelClick = () => {
  formRef.value?.resetFields()
  changeDialogVisible()
}
const handleOKClick = () => {
  systemStore.postAddAction(props.modalConfig.pageName, DialogForm)
  systemStore.postQueryAllAction(props.modalConfig.pageName)
  formRef.value?.resetFields()
  // changeDialogVisible()
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
