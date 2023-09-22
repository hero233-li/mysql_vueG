import { defineStore } from 'pinia'
import type { IAccountLoginForm, IIphoneLoginForm } from '@/types/Login/login'
import { accountLoginRequest, getUserInfoById, iphoneLoginRequest } from '@/service/Login/login'
import { localCache } from '@/utils/catch'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
const useLoginStore = defineStore('login', {
  state: () => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? ''
  }),
  actions: {
    async LoginAccountAction(accountData: IAccountLoginForm) {
      const loginResult = await accountLoginRequest({ accountData })
      console.log(loginResult)
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)
      await router.push('/GMain')
    },
    async LoginIphoneAction(iphoneData: IIphoneLoginForm) {
      const loginResult = await iphoneLoginRequest({ iphoneData })

      this.token = loginResult.data.token
      const iphone = loginResult.data.userInfo.iphone
      localCache.setCache(LOGIN_TOKEN, this.token)
      await router.push('/GMain')
    }
  }
})
export default useLoginStore
