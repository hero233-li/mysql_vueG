import { defineStore } from 'pinia'
import { PostQueryDepartmentRequest } from '@/service/System/Department/Deapetment'
import { queryAccountRequest } from '@/service/System/Account/Account'
import { PostQueryMenuRequest } from '@/service/System/Menu/MenuManagement'
import { PostQueryRoleRequest } from '@/service/System/Role/role'

const SystemManageStore = defineStore('system', {
  state: () => ({
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async deletePageByIDAction(pageName: string, id: string) {
      if (pageName === 'department') {
        // await queryDepartmentByIDRequest(id)
      }
    },
    async postQueryAllAction(pageName: string, listData) {
      if (pageName === 'department') {
        console.log(listData)
        const { totalCount, list } = await PostQueryDepartmentRequest(listData)
        this.pageList = list
        this.pageTotalCount = totalCount
        console.log(this.pageList)
      } else if (pageName === 'account') {
        const { totalCount, list } = await queryAccountRequest(listData)
        this.pageList = list
        this.pageTotalCount = totalCount
      } else if (pageName === 'menu') {
        const { totalCount, list } = await PostQueryMenuRequest(listData)
        this.pageList = list
        this.pageTotalCount = totalCount
      } else if (pageName === 'role') {
        const { totalCount, list } = await PostQueryRoleRequest(listData)
        this.pageList = list
        this.pageTotalCount = totalCount
      }
    }
  }
})

export default SystemManageStore
