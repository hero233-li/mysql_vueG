<template>
  <div class="main-Header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon>
        <el-icon size="28px">
          <component :is="isFold ? 'Expand' : 'Fold'" />
        </el-icon>
      </el-icon>
    </div>
    <div class="content">
      <div class="Breadcrumb">
        <el-breadcrumb :separator-icon="ArrowRight">
          <template v-for="item in breadcrumb" :key="item.name">
            <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
      <div class="headerInfo">
        <el-icon><Coin /></el-icon>
        <el-dropdown>
          <span class="user-info">
            <el-avatar
              :size="30"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />

            <span class="name">
              {{ userinfo.username }}
            </span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a" @click="ExitSystem">
                退出系统

                <el-icon class="el-icon--right"><SwitchButton /></el-icon>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { localCache } from '@/utils/catch'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import useLoginStore from '@/store/Login/login'
import { ArrowRight, Coin, SwitchButton } from '@element-plus/icons-vue'
import { mapPathToBreadcrumb } from '@/utils/map-menu'
import { useRoute } from 'vue-router'

/**
 * 右侧顶部工具栏，将该组件抽离出来，读取后端返回的菜单数据，动态写入面包屑中
 * todo-1：功能还差标签tab页面没有实现
 * todo-2：页面美化没有开展
 */
const route = useRoute()
const userStore = useLoginStore()
const userMenus = userStore.userMenus
const breadcrumb = computed(() => {
  return mapPathToBreadcrumb(route.path, userMenus)
})

const isFold = ref(false)
const emit = defineEmits(['flodChange'])
const handleMenuIconClick = () => {
  isFold.value = !isFold.value
  emit('flodChange', isFold.value)
}
const userinfo = userStore.userinfo
const ExitSystem = () => {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/GLogin')
}
</script>

<style scoped>
.headerInfo {
  display: flex;
  align-items: center;
}
.main-Header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}

.headerInfo {
  .user-info {
    display: flex;
    align-items: center;
  }
  .user-info:hover {
    cursor: default;
  }
  .user-info:focus {
    outline: none;
  }
  .name {
    margin-left: 5px;
  }
}
</style>
