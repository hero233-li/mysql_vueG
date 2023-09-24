import { queryDepartmentRequest } from '@/service/System/Department/Deapetment'
import { defineStore } from 'pinia'

const DepartmentManageStore = defineStore('Department', {
  state: () => ({
    entireDepartment: []
  }),
  actions: {
    async queryDepartmentList() {
      const list = await queryDepartmentRequest()
      this.entireDepartment = list
    }
  }
})

export default DepartmentManageStore
