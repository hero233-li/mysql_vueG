import { defineStore } from 'pinia'
import type { IAccountModal, ISearchFrom, ISystemAccount } from '@/types/system/account/account'
import {
  addAccountRequest,
  editAccountRequest,
  editAccountStateRequest,
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
    async changeStatus(accountData: ISearchFrom) {
      await editAccountStateRequest(accountData)
    },
    async removeAccount(uuid) {
      const deleteID = { uuid }
      return await removeAccountRequest(deleteID)
    },
    async addAccount(accountData: IAccountModal) {
      return await addAccountRequest(accountData)
    },
    async editAccount(accountData: IAccountModal) {
      return await editAccountRequest(accountData)
    }
  }
})
export default AccountManageStore
