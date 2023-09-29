import glRequest from '@/service'
export function PostQueryDepartmentRequest(listData: any) {
  return glRequest.post({
    url: '/api/department/queryList',
    data: listData
  })
}

export function PostQueryDepartmentByIDRequest(ID: string) {
  return glRequest.post({
    url: '/api/department/deleteByID',
    data: ID
  })
}
