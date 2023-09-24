import glRequest from '@/service'

/**
 * 获取到所有的菜单
 * @constructor
 */
export function AllMenuRequest() {
  return glRequest.get({
    url: '/api/menu/queryAllMenu'
  })
}
