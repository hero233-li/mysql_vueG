import { defineStore } from 'pinia'
import type { IAccountIphoneLoginForm, IAccountLoginForm } from '@/types/Login/login'
import {
  accountEmailLoginRequest,
  accountIphoneLoginRequest,
  accountLoginRequest,
  getUserInfoById,
  getUserMenusRequest
} from '@/service/Login/login'
import { localCache } from '@/utils/catch'
import router from '@/router'
import { LOGIN_TOKEN, USERINFO, USERMENU } from '@/global/constants'
import { mapMenusToRouters } from '@/utils/map-menu'
import DepartmentManageStore from '@/store/system/Department/Department'
import RoleManageStore from '@/store/system/Role/Role'
interface ILoginState {
  token: string
  userinfo: any
  userMenus: object[]
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userinfo: localCache.getCache(USERINFO) ?? {},
    userMenus: localCache.getCache(USERMENU) ?? []
  }),
  actions: {
    /**
     * 特殊账号登录
     * @param accountData
     * @constructor
     */
    /**
     * 手机号登录
     * @param accountData
     * @constructor
     */
    async LoginAccountAction(accountData) {
      console.log(accountData.account)
      let loginResult = {}
      if (accountData.iphone) {
        console.log(accountData.iphone)
        loginResult = await accountIphoneLoginRequest({ accountData })
      } else if (accountData.email) {
        console.log(accountData.email)
        loginResult = await accountEmailLoginRequest({ accountData })
      } else if (accountData.account) {
        console.log(accountData.account)
        loginResult = await accountLoginRequest({ accountData })
      }

      if (loginResult.code === 0) {
        this.token = loginResult.data.token
        localCache.setCache(LOGIN_TOKEN, this.token)
        const userInfoResult = await getUserInfoById()
        this.userinfo = userInfoResult
        const userMenusResult = await getUserMenusRequest()
        this.userMenus = userMenusResult
        localCache.setCache(USERINFO, userInfoResult)
        localCache.setCache(USERMENU, userMenusResult)
        const departStore = DepartmentManageStore()
        const roleStore = RoleManageStore()
        await departStore.queryDepartmentList()
        await roleStore.queryRoleList()
        //获取到与当前账号相匹配的路由，遍历全部注册到name为/GMain的子组件下
        const routes = mapMenusToRouters(this.userMenus)
        routes.forEach((route) => router.addRoute('/GMain', route))
        console.log(222)
        await router.push('/GMain')
      }
      return loginResult
    },
    /**
     * 当界面刷新的时候，从接口去到的menu数据，会pinia失活。须要二次读取
     * 当用户刷新的时候，判断是否登录以及是否包含usermenu菜单,在刷新的时候读取本地缓存
     */
    loadLocalCacheAction() {
      // 用户刷新的时候，加载本地数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USERINFO)
      const userMenu = localCache.getCache(USERMENU)

      if (token && userMenu && userInfo) {
        this.token = token
        this.userinfo = userInfo
        this.userMenus = userMenu
        const departStore = DepartmentManageStore()
        const roleStore = RoleManageStore()
        departStore.queryDepartmentList().then()
        roleStore.queryRoleList().then()
        // 添加路由
        const routes = mapMenusToRouters(this.userMenus)
        routes.forEach((route) => router.addRoute('/GMain', route))
      }
    }
  }
})
export default useLoginStore
