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
    url: '/login/iphone',
    data: iphoneData
  })
}

/**
 * 特殊账号登录
 * @param accountData
 */
export function accountLoginRequest(accountData: IAccountLoginForm) {
  console.log(accountData)
  return glRequest.post({
    url: '/user/login/account',
    data: accountData
  })
}

/**
 * 手机号密码登录
 * @param accountData
 */
export function accountIphoneLoginRequest(accountData: IAccountIphoneLoginForm) {
  console.log(accountData)
  return glRequest.post({
    url: '/user/login/iphone',
    data: accountData
  })
}

/**
 * 邮箱密码登录
 * @param accountData
 */
export function accountEmailLoginRequest(accountData: IAccountEmailLoginForm) {
  console.log(accountData)
  return glRequest.post({
    url: '/user/login/email',
    data: accountData
  })
}

export function getUserInfoById(id: number) {
  return glRequest.get({
    url: `/users/${id}`
  })
}
