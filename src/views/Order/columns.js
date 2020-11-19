const columns = [
  {
    title: '订单编号',
    dataIndex: 'order_sn',
    width: 150
  },
  {
    title: '车辆编号',
    dataIndex: 'bike_sn',
    width: 150
  },
  {
    title: '用户名',
    align: 'center',
    dataIndex: 'user_name',
    width: 80
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: 150
  },
  {
    title: '里程',
    dataIndex: 'distance',
    align: 'center',
    width: 80,
    render: (distance) => distance / 1000 + ' km'
  },
  {
    title: '行驶时长',
    dataIndex: 'total_time',
    align: 'center',
    width: 100
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    align: 'center',
    render: (status) => status === 1 ? '进行中' : '行程结束'
  },
  {
    title: '开始时间',
    dataIndex: 'start_time',
    width: 150
  },
  {
    title: '结束时间',
    dataIndex: 'end_time',
    width: 150
  },
  {
    title: '订单金额',
    dataIndex: 'total_fee',
    align: 'center',
    width: 100
  },
  {
    title: '实付金额',
    dataIndex: 'user_pay',
    width: 100,
    align: 'center'
  }
];

export default columns;
