import { queryRoleRequest } from '@/service/System/Role/role'
import { defineStore } from 'pinia'

const RoleManageStore = defineStore('Role', {
  state: () => ({
    entireRole: []
  }),
  actions: {
    async queryRoleList() {
      const list = await queryRoleRequest()
      this.entireRole = list
    }
  }
})

export default RoleManageStore
