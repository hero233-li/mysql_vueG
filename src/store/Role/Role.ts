import { queryRoleNameRequest, queryRoleRequest } from '@/service/System/Role/role'
import { defineStore } from 'pinia'

const RoleManageStore = defineStore('Role', {
  state: () => ({
    entireRole: []
  }),
  actions: {
    async queryRoleList() {
      this.entireRole = await queryRoleRequest()
    },
    async queryRoleName() {
      return await queryRoleNameRequest()
    }
  }
})

export default RoleManageStore
