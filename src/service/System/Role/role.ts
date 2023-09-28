import glRequest from '@/service'
export function queryRoleRequest() {
  return glRequest.post({
    url: '/api/role/queryList'
  })
}
export function queryRoleNameRequest() {
  return glRequest.post({
    url: '/api/role/roleName'
  })
}
