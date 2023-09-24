<template>
  <div class="main-menu">
    <div class="logo"><img class="img" src="@/assets/img/menu-logo.svg" alt="" /></div>
    <div class="menu">
      <!--    default-active="5"     选中活跃item，item的index值-->
      <el-menu
        :default-active="defaultActive"
        text-color="#00000"
        :collapse="props.isCollapse"
        active-text-color="#009688"
        background-color="#faf7fa"
      >
        <template v-for="item in userMenus" :key="menu_group_id">
          <el-sub-menu :index="item.menu_group_id + ''">
            <template #title>
              <el-icon>
                <component :is="item.menu_group_icon" />
              </el-icon>
              <span>{{ item.menu_group_name }}</span>
            </template>
            <template v-for="submenu in item.menu_chirlden" :key="submenu.menu_id">
              <el-menu-item
                :index="submenu.menu_id + ''"
                @click="handleItemClick(submenu.menu_router)"
                >{{ submenu.menu_name }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useLoginStore from '@/store/Login/login'
import { useRoute } from 'vue-router'
import router from '@/router'
import { mapPathToPath } from '@/utils/map-menu'
const userStore = useLoginStore()
const userMenus = userStore.userMenus
const route = useRoute()

const defaultActive = computed(() => {
  const PathMenu = mapPathToPath(route.path, userMenus)
  return PathMenu.menu_id + ''
})
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: true
  }
})

const handleItemClick = (item) => {
  router.push(item)
}
</script>
<style scoped>
.main-menu {
  //height: 100vh;
  background-color: #faf7fa;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}
.img {
  height: 100%;
  margin: 0 10px;
}
</style>
