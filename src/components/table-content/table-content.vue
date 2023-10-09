<template>
  <div class="table-content">
    <div class="table-title">
      <span>{{ contentConfig?.header?.title ?? '数据列表' }}</span>
      <div class="btn">
        <el-button type="primary" @click="handleClickNewAccount">
          <el-icon><Plus /></el-icon>
          <span>{{ contentConfig?.header?.btnTitle ?? '新建数据' }}</span>
        </el-button>
        <el-button @click="fetchPageListData">
          <el-icon><Refresh /></el-icon>
          <span>刷新数据</span>
        </el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        style="width: 100%"
        :data="pageList"
        row-key="department_group_id"
        :tree-props="{ children: 'children' }"
      >
        <template v-for="item in contentConfig.propList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handle'">
            <el-table-column v-bind="item">
              <template #default="scope">
                <template v-for="element in item.buttonOption">
                  <template v-if="element.btnType === 'edit'">
                    <el-button v-bind="element" @click="handleClickEditAccount(scope.row)">
                      编辑
                    </el-button>
                  </template>
                  <template v-else-if="element.btnType === 'Refresh'">
                    <el-button v-bind="element">重置密码</el-button>
                  </template>
                  <template v-else-if="element.btnType === 'delete'">
                    <el-button
                      v-bind="element"
                      @click="handleClickDelete(contentConfig.pageName, scope.row.uuid)"
                    >
                      删除
                    </el-button>
                  </template>
                </template>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'tree'">
            <!--            当是tree的时候，需要专门写一个:prop="item.prop"，否则会不生效-->
            <el-table-column :prop="item.prop" :label="item.label" width="180" />
          </template>
          <template v-else-if="item.type === 'status'">
            <el-table-column v-bind="item">
              <template #default="scope">
                <!-- 如果插槽的值为 el-switch，第一次加载会默认触发 switch 的 @change 方法，所有在外层包一个盒子，点击触发盒子 click 方法（暂时只能这样解决） -->
                <div @click="changeStatus(scope.row)">
                  <el-switch
                    :model-value="scope.row[item.prop]"
                    :active-text="scope.row[item.prop] === 1 ? '启用' : '禁用'"
                    :active-value="1"
                    :inactive-value="0"
                  />
                </div>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item" />
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
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatUTC } from '@/utils/timeFormate'
import SystemManageStore from '@/store/system/system'
import { storeToRefs } from 'pinia'

/**
 * 将系统管理的中心表格抽离出来，使用定义的接口，让各个界面传递相应的config获取相关的表字段
 * todo：编辑功能未实现
 * todo：删除功能，未测试完成
 * todo：页面美化
 */
/**
 * 类型声明以及props返出
 */
interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propList: any[]
  }
}
const props = defineProps<IProps>()

// 1.发起action，请求pageList的数据
const systemStore = SystemManageStore()
const currentPage = ref(1)
const pageSize = ref(10)

// 2.获取pageList数据,进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)
// 3.页码相关的逻辑
const handleSizeChange = () => {
  fetchPageListData()
}
const handleCurrentChange = () => {
  fetchPageListData()
}
// 4.定义函数, 用于发送网络请求
const fetchPageListData = (formData: any = {}) => {
  const limit = pageSize.value
  const offset = (currentPage.value - 1) * limit
  const pageInfo = { limit, offset }
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postQueryAllAction(props.contentConfig.pageName, queryInfo)
}
fetchPageListData()
/**
 * 新建按钮和编辑按钮
 */
const emit = defineEmits(['newBtnClick', 'EditAccountClick'])
const handleClickNewAccount = () => {
  emit('newBtnClick')
}
const handleClickEditAccount = (item: any) => {
  emit('EditAccountClick', item)
}
defineExpose({ fetchPageListData })
/**
 * 状态修改按钮
 */
const changeStatus = (item) => {
  // item.prop = item.userstate === 0 ? 1 : 0
  // console.log(item.userstate)
  // accountStore.changeStatus(item)
  systemStore.ChangeStatusAction(props.contentConfig.pageName, item)
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
