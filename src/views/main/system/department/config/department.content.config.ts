const departmentContentConfig = {
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  propList: [
    {
      fixed: true,
      type: 'index',
      prop: '',
      align: 'center',
      label: '序号',
      width: '100'
    },
    {
      fixed: false,
      type: '',
      prop: 'useraccount',
      align: 'center',
      label: '部门名称',
      width: '100'
    },
    {
      fixed: false,
      type: 'timer',
      prop: 'createTime',
      align: 'center',
      label: '创建时间',
      width: ''
    }
  ]
}
export default departmentContentConfig
