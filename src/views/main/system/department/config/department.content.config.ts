const departmentContentConfig = {
  pageName: 'department',
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
      type: 'tree',
      prop: 'department_name',
      align: 'center',
      label: '部门名称',
      width: ''
    },
    // {
    //   fixed: false,
    //   type: 'custom',
    //   prop: ' ',
    //   align: 'center',
    //   label: '部门名称',
    //   width: ' ',
    //   slotName: 'departmentName'
    // },
    {
      fixed: false,
      type: 'timer',
      prop: 'createTime',
      align: 'center',
      label: '创建时间',
      width: ''
    },
    {
      fixed: false,
      type: 'status',
      prop: 'department_state',
      align: 'center',
      label: '部门状态',
      width: ''
    },
    {
      fixed: false,
      type: 'handle',
      align: 'center',
      label: '操作',
      width: '',
      buttonOption: [
        {
          btnType: 'edit',
          icon: 'Edit',
          size: 'small',
          text: true
        },
        {
          btnType: 'delete',
          type: 'danger',
          icon: 'Delete',
          size: 'small',
          text: true
        }
      ]
    }
  ]
}
export default departmentContentConfig
