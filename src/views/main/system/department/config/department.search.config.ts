const departmentSearchConfig = {
  formItems: [
    {
      span: 4,
      type: 'input',
      prop: 'department_name',
      label: '部门名称',
      placeholder: '请输入',
      initialValue: ''
    },
    {
      span: 4,
      type: 'select',
      prop: 'department_state',
      label: '状态',
      placeholder: '请选择',
      initialValue: '1',
      selectOption: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '停用',
          value: 0
        }
      ]
    }
  ]
}
export default departmentSearchConfig
