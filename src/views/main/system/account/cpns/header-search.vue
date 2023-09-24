<template>
  <div class="header-search">
    <el-form :model="searchForm" ref="formRef" label-width="100px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="账号名称" prop="userAccount">
            <el-input placeholder="请输入" v-model="searchForm.useraccount" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="账号昵称" label-width="80px" prop="username">
            <el-input placeholder="请输入" v-model="searchForm.username" /> </el-form-item
        ></el-col>

        <el-col :span="4">
          <el-form-item label="手机号" label-width="80px" prop="userIphone">
            <el-input placeholder="请输入" v-model="searchForm.userIphone" /> </el-form-item
        ></el-col>

        <el-col :span="4">
          <el-form-item label="状态" prop="userState">
            <el-select placeholder="请选择" v-model="searchForm.userState">
              <el-option label="启用" value="1" />
              <el-option label="停用" value="0" />
            </el-select> </el-form-item
        ></el-col>

        <el-col :span="4">
          <el-button plain @click="handleClickReset">
            <el-icon><Delete /></el-icon>
            <span> 重置 </span></el-button
          >
          <el-button type="primary" @click="handleClickSearch">
            <el-icon><Search /></el-icon>
            <span> 查询 </span>
          </el-button></el-col
        >
      </el-row>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElForm } from 'element-plus'

const searchForm = reactive({
  username: '',
  useraccount: '',
  useriphone: '',
  useremail: '',
  userstate: ''
})
const formRef = ref<InstanceType<typeof ElForm>>()
const emit = defineEmits(['queryClick', 'resetClick'])

const handleClickReset = () => {
  formRef.value?.resetFields()
  emit('resetClick', searchForm)
}
const handleClickSearch = () => {
  emit('queryClick', searchForm)
}
</script>
<style scoped>
/* CSS Inspector (https://vben.vvbin.cn/#/system/account) */

.header-search {
  background-color: rgb(255, 255, 255);
  border-radius: 2px;
  box-sizing: border-box;
  margin: 0px 0px 16px;
  padding: 12px 10px 6px;
}
</style>
