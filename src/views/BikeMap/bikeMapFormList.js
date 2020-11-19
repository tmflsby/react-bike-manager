const bikeMapFormList = [
  {
    type: '城市',
    field:'city'
  }, {
    type: '时间查询',
    field:'search_time'
  }, {
    type: 'SELECT',
    label: '订单状态',
    field: 'order_status',
    placeholder: '全部',
    initialValue: '0',
    list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '行程结束' }],
    width: 100
  }
];

export default bikeMapFormList;
