const orderFormList = [
  {
    type: 'SELECT',
    label: '城市',
    field: 'city_id',
    initialValue: '0',
    width: 100,
    placeholder: '全部',
    list: [
      { id: '0', name: '全部' },
      { id: '1', name: '北京' },
      { id: '2', name: '天津' },
      { id: '3', name: '上海' },
      { id: '4', name: '深圳' }
    ]
  },
  {
    type: '时间查询',
    field: 'time'
  },
  {
    type: 'SELECT',
    label: '订单状态',
    field: 'order_status',
    initialValue: '0',
    width: 120,
    placeholder: '全部',
    list: [
      { id: '0', name: '全部' },
      { id: '1', name: '进行中' },
      { id: '2', name: '行程结束' }
    ]
  }
];

export default orderFormList;
