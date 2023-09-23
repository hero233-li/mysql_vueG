import glRequest from '..'
import type {
  IAccountEmailLoginForm,
  IAccountIphoneLoginForm,
  IAccountLoginForm,
  IIphoneLoginForm
} from '@/types/Login/login'

/**
 * 手机验证码登录
 * @param iphoneData
 */
export function iphoneLoginRequest(iphoneData: IIphoneLoginForm) {
  return glRequest.post({
    url: '/test',
    data: iphoneData
  })
}

/**
 * 特殊账号登录
 * @param accountData
 */
export function accountLoginRequest(accountData: IAccountLoginForm) {
  return glRequest.post({
    url: '/api/user/login/account',
    data: accountData
  })
}

/**
 * 手机号密码登录
 * @param accountData
 */
export function accountIphoneLoginRequest(accountData: IAccountIphoneLoginForm) {
  return glRequest.post({
    // url:'/api/user/list',
    url: '/api/login/iphone',
    data: accountData
  })
}

/**
 * 邮箱密码登录
 * @param accountData
 */
export function accountEmailLoginRequest(accountData: IAccountEmailLoginForm) {
  return glRequest.post({
    url: '/api/user/login/email',
    data: accountData
  })
}

export function getUserInfoById() {
  return glRequest.get({
    url: `/api/login/query/`
  })
}
export function getUserMenusRequest() {
  return glRequest.get({
    url: '/api/menu/queryUserMenu'
  })
}
