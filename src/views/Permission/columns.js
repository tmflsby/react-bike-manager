import moment from "moment";

const columns = [
  {
    title: '角色ID',
    width: 50,
    dataIndex: 'id'
  },
  {
    title: '角色名称',
    width: 100,
    dataIndex: 'role_name'
  },
  {
    title: '创建时间',
    width: 200,
    dataIndex: 'create_time',
    render: (create_time) => moment(create_time).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '使用状态',
    width: 100,
    dataIndex: 'status',
    render: (status) => status === 1 ? '启用' : '停用'
  },
  {
    title: '授权时间',
    width: 200,
    dataIndex: 'authorize_time',
    render: () => moment().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '授权人',
    width: 100,
    dataIndex: 'authorize_user_name'
  }
];

export default columns;
