import glRequest from '@/service'
import type { ISearchFrom } from '@/types/system/account/account'
import type { IAccountModal } from '@/types/system/account/account'

/**
 * 账号管理页面的网络请求
 */
export function queryAccountRequest(searchData: ISearchFrom) {
  return glRequest.post({
    url: '/api/account/queryList',
    data: searchData
  })
}
export function removeAccountRequest(uuid: string) {
  return glRequest.delete({
    url: '/api/account/deleteAccount',
    data: uuid
  })
}
export function addAccountRequest(accountData: IAccountModal) {
  return glRequest.post({
    url: '/api/account/addAccount',
    data: accountData
  })
}
export function editAccountRequest(accountData: IAccountModal) {
  return glRequest.post({
    url: '/api/account/editAccount',
    data: accountData
  })
}
export function editAccountStateRequest(accountData: ISearchFrom) {
  return glRequest.post({
    url: '/api/account/editState',
    data: accountData
  })
}
