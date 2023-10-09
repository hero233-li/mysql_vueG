import { defineStore } from 'pinia'
import {
  PostChangeStatusDepartmentRequest,
  PostQueryDepartmentRequest
} from '@/service/System/Department/Deapetment'
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
    async ChangeStatusAction(pageName: string, info: any) {
      if (pageName === 'department') {
        if (typeof info.department_group_id !== 'undefined') {
          info.department_state = info.department_state === 0 ? 1 : 0
          const id = info.department_group_id
          const state = info.department_state
          await PostChangeStatusDepartmentRequest({ id, state })
        }
      }
    },
    async postQueryAllAction(pageName: string, listData = {}) {
      if (pageName === 'department') {
        const { totalCount, list } = await PostQueryDepartmentRequest(listData)
        this.pageList = list
        this.pageTotalCount = totalCount
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
    },
    async postAddAction(pageName: string, listData) {
      if (pageName === 'department') {
        console.log(listData)
      } else if (pageName === 'account') {
      } else if (pageName === 'menu') {
      } else if (pageName === 'role') {
      }
    }
  }
})

export default SystemManageStore
