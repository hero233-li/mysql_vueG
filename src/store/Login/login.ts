import { defineStore } from 'pinia'
import type { IAccountIphoneLoginForm, IAccountLoginForm, IIphoneLoginForm } from "@/types/Login/login";
import {
  accountIphoneLoginRequest,
  accountLoginRequest, getUserInfoById
} from "@/service/Login/login";
import { localCache } from '@/utils/catch'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
interface ILoginState{
  token:string,
  userinfo:any
}
const useLoginStore = defineStore('login', {
  state: ():ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userinfo:{}
  }),
  actions: {
    /**
     * 特殊账号登录
     * @param accountData
     * @constructor
     */
    async LoginAccountAction(accountData: IAccountLoginForm) {
      const loginResult = await accountLoginRequest({ accountData })
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)
      await router.push('/GMain')
    },
    /**
     * 手机号登录
     * @param accountData
     * @constructor
     */
    async LoginIphoneAction(accountData: IAccountIphoneLoginForm) {
      const loginResult = await accountIphoneLoginRequest({ accountData })
      if (loginResult.code===0){
        this.token = loginResult.data.token
        const uuid=loginResult.data.uuid
        const username=loginResult.data.username
      localCache.setCache(LOGIN_TOKEN, this.token)
        const userInfoResult= await getUserInfoById()
        this.userinfo=userInfoResult
        console.log(this.userinfo);
      await router.push('/GMain')
      }
        return loginResult
    }
  }
})
export default useLoginStore
