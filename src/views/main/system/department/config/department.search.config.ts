const departmentSearchConfig = {
  formItems: [
    {
      span: 4,
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入',
      initialValue: '123'
    },
    {
      span: 4,
      type: 'select',
      prop: 'menu_group_state',
      label: '状态',
      placeholder: '请选择',
      initialValue: '123',
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
