const departmentModalConfig = {
  header: {
    newTitle: '新建部门',
    editTitle: '编辑部门'
  },
  pageName: 'department',

  formItems: [
    {
      label: '部门名称',
      prop: 'department_name',
      type: 'input',
      autocomplete: 'off',
      placeholder: '请输入部门'
    },

    {
      span: 4,
      type: 'select',
      prop: 'department_group_remark',
      label: '是上级部门',
      placeholder: '请选择',
      initialValue: '1',
      selectOption: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
        }
      ]
    },
    {
      type: 'select',
      prop: 'department_group_id',
      label: '上级部门',
      placeholder: '请选择',
      initialValue: '',
      selectOption: []
    }
  ]
}
export default departmentModalConfig
