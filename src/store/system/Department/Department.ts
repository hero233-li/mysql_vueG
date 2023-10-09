import { defineStore } from 'pinia'
import { PostQueryGroupDepartmentRequest } from '@/service/System/Department/Deapetment'

const DepartmentManageStore = defineStore('Department', {
  state: () => ({
    entireDepartment: [],
    entireDepartmentGroup: []
  }),
  actions: {
    async queryDepartmentList() {
      this.entireDepartment = await PostQueryGroupDepartmentRequest()
    },
    async queryGroupDepartment() {
      this.entireDepartmentGroup = await PostQueryGroupDepartmentRequest()
    }
  }
})

export default DepartmentManageStore
