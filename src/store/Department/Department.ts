import { queryDepartmentRequest } from '@/service/System/Department/Deapetment'
import { defineStore } from 'pinia'

const DepartmentManageStore = defineStore('Department', {
  state: () => ({
    entireDepartment: []
  }),
  actions: {
    async queryDepartmentList() {
      this.entireDepartment = await queryDepartmentRequest()
    }
  }
})

export default DepartmentManageStore
