<template>
  <div class="header-search">
    <el-form :model="searchForm" ref="formRef" label-width="100px" label-position="left">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="item.span">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select placeholder="请选择" v-model="searchForm[item.prop]">
                  <template v-for="element in item.selectOption" :key="element.value">
                    <el-option :label="element.label" :value="element.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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
import { Delete, Search } from '@element-plus/icons-vue'

/**
 * 搜索框组件抽离，
 * 设置一个默认传值类型，根据不同组件，而传入不同的config，使得显示和返回的字段不同，
 * 且将确认和重置按钮事件返回到父组件，抽离为hooks函数，
 * 该组件工作以及完成
 */
interface IProps {
  searchConfig: {
    formItems: any[]
  }
}
const props = defineProps<IProps>()
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}

const searchForm = reactive({})
const formRef = ref<InstanceType<typeof ElForm>>()
const emit = defineEmits(['searchClick', 'clearClick'])
/**
 * 搜索框组件的重置按钮和搜索按钮
 */
const handleClickReset = () => {
  formRef.value?.resetFields()
  emit('clearClick', searchForm)
}
const handleClickSearch = () => {
  emit('searchClick', searchForm)
}
</script>
<style scoped>
.header-search {
  background-color: rgb(255, 255, 255);
  border-radius: 2px;
  box-sizing: border-box;
  margin: 0px 0px 16px;
  padding: 12px 10px 6px;
}
</style>
