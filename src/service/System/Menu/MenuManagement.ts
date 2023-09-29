import glRequest from '@/service'
import { PostQueryDepartmentRequest } from '@/service/System/Department/Deapetment'

/**
 * 获取到所有的菜单
 * @constructor
 */
export function GetAllMenuRequest() {
  return glRequest.get({
    url: '/api/menu/queryAllMenu'
  })
}
export function PostQueryMenuRequest(listData: any) {
  return glRequest.post({
    url: '/api/menu/queryList',
    data: listData
  })
}
