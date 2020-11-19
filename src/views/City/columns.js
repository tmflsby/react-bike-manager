import moment from "moment";

const columns = [
  {
    title: '城市Id',
    dataIndex: 'id'
  },
  {
    title: '城市名称',
    dataIndex: 'name'
  },
  {
    title: '用车模式',
    dataIndex: 'mode',
    render: (mode) => (
      mode === 1 ? '禁停区' : '停车点'
    )
  },
  {
    title: '运营模式',
    dataIndex: 'op_mode',
    render: (op_mode) => (
      op_mode === 1 ? '自营' : '加盟'
    )
  },
  {
    title: '授权加盟商',
    dataIndex: 'franchisee_name'
  },
  {
    title: '城市管理员',
    dataIndex: 'city_admins',
    render(arr) {
      return arr
        .map((item) => {
          return item.user_name
        })
        .join(',')
    }
  },
  {
    title: '城市开通时间',
    dataIndex: 'open_time'
  },
  {
    title: '操作时间',
    dataIndex: 'update_time',
    render(update_time) {
      return (
        moment(update_time).format('YYYY-MM-DD HH:mm:ss')
      );
    }
  },
  {
    title: '操作人',
    dataIndex: 'sys_user_name'
  }
];

export default columns;
