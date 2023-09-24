import { defineStore } from 'pinia'
import type { IAccountModal, ISearchFrom, ISystemAccount } from '@/types/system/account/account'
import {
  addAccountRequest,
  queryAccountRequest,
  removeAccountRequest
} from '@/service/System/Account/Account'

const AccountManageStore = defineStore('account', {
  state: (): ISystemAccount => ({
    accountList: [],
    accountTotalCount: 0
  }),
  actions: {
    async queryAccountList(accountData: ISearchFrom) {
      const { totalCount, list } = await queryAccountRequest(accountData)
      this.accountList = list
      this.accountTotalCount = totalCount
    },
    async removeAccount(uuid) {
      const deleteID = { uuid }
      return await removeAccountRequest(deleteID)
    },
    async addAccount(accountData: IAccountModal) {
      return await addAccountRequest(accountData)
    }
  }
})
export default AccountManageStore
