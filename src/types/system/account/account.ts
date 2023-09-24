export interface ISearchFrom {
  username: string
  useraccount: string
  useriphone: string
  useremail: string
  userrole: string
  userstate: number
  limit: number
  offset: number
}
export interface IAccountModal {
  username: string
  useraccount: string
  useremail: string
  userrole: string
  userdepartment: string
  userremark: string
  userpwd: string
  useriphone: string
}

export interface IAccount {
  uuid: string
  username: string
  useraccount: string
  useriphone: string
  useremail: string
  userpwd: string
  userrole: string
  userstate: number
  userremark?: any
  createTime: string
  updateTime: string
}
export interface ISystemAccount {
  accountList: IAccount[]
  accountTotalCount: number
}
