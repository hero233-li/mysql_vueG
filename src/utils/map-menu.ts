import type { RouteRecordRaw } from 'vue-router'

/**
 * 读取所有的路由文件，将路径写入并返回
 */
export const loadLocalRouters = () => {
  const localRouter: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  for (const key in files) {
    const module = files[key]
    localRouter.push(module.default)
  }
  return localRouter
}
export let firstMenu: any = null
/**
 * 动态加载所有的路由
 * 首先将本地的所有路由进行读取，然后将后台获取到的路由菜单数据进行比较，如果和本地匹配相等的，就写入到数组
 * @param deliverUserMenus
 */
export const mapMenusToRouters = (deliverUserMenus) => {
  //加载本地路由
  const localRouter = loadLocalRouters()
  const userMenus = deliverUserMenus
  //根据菜单匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (let i = 0; i < Object.values(userMenus).length; i++) {
    const submenuLength = Object.values(userMenus[i].menu_chirlden).length
    const submenu = Object.values(userMenus[i].menu_chirlden)
    for (let j = 0; j < submenuLength; j++) {
      const route = localRouter.find((item) => item.path === submenu[j].menu_router)
      if (route) {
        if (!routes.find((item) => item.path === userMenus[i].menu_group_router)) {
          routes.push({
            path: userMenus[i].menu_group_router,
            redirect: route.path
          })
        }
        routes.push(route)
      }

      //记录第一个匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu[j]
    }
  }
  return routes
}
/**
 * 根据传入的路径，去匹配显示的菜单
 * @param path
 * @param userMenus
 */
export const mapPathToPath = (path: string, userMenus) => {
  for (let i = 0; i < Object.values(userMenus).length; i++) {
    const submenuLength = Object.values(userMenus[i].menu_chirlden).length
    const submenu = Object.values(userMenus[i].menu_chirlden)
    for (let j = 0; j < submenuLength; j++) {
      if (submenu[j].menu_router === path) return submenu[j]
    }
  }
  return undefined
}
/**
 * 面包屑
 * @param path
 * @param userMenus
 */
export const mapPathToBreadcrumb = (path: string, userMenus) => {
  const breadcrumb = []
  for (let i = 0; i < Object.values(userMenus).length; i++) {
    const submenuLength = Object.values(userMenus[i].menu_chirlden).length
    const submenu = Object.values(userMenus[i].menu_chirlden)
    for (let j = 0; j < submenuLength; j++) {
      if (submenu[j].menu_router === path) {
        breadcrumb.push({
          name: userMenus[i].menu_group_name,
          path: userMenus[i].menu_group_router
        })
        breadcrumb.push({ name: submenu[j].menu_name, path: submenu[j].menu_router })
      }
    }
  }
  return breadcrumb
}
