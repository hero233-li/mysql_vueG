import glRequest from '@/service'
import { PostQueryDepartmentRequest } from '@/service/System/Department/Deapetment'
export function queryRoleRequest() {
  return glRequest.post({
    url: '/api/role/queryList'
  })
}
export function PostQueryRoleNameRequest() {
  return glRequest.post({
    url: '/api/role/roleName'
  })
}
export function PostQueryRoleRequest(listData: any) {
  return glRequest.post({
    url: '/api/role/queryList',
    data: listData
  })
}
