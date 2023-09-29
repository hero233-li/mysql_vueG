import { defineStore } from 'pinia'
import { AllMenuRequest } from '@/service/System/Menu/MenuManagement'

const menuManageStore = defineStore('menu', {
  state: () => ({
    menuObj: {},
    CurrentMenuInfo: []
  }),
  actions: {
    async queryAllMenu() {
      this.menuObj = await AllMenuRequest()
    }
  }
})
export default menuManageStore
