import glRequest from '@/service'
export function PostQueryDepartmentRequest(listData: any) {
  return glRequest.post({
    url: '/api/department/queryList',
    data: listData
  })
}
export function PostQueryGroupDepartmentRequest() {
  return glRequest.post({
    url: '/api/department/queryGroup'
  })
}
export function PostChangeStatusDepartmentRequest(listData: any) {
  return glRequest.post({
    url: '/api/department/editStatus',
    data: listData
  })
}

export function PostQueryDepartmentByIDRequest(ID: string) {
  return glRequest.post({
    url: '/api/department/deleteByID',
    data: ID
  })
}
