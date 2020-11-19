const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 100
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 100
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 100,
    render: (sex) => sex === 1 ? '男' : '女'
  },
  {
    title: '状态',
    dataIndex: 'state',
    width: 100,
    render: (state) => {
      let config = {
        '1': "咸🐟一条",
        '2': '风华浪子',
        '3': '北大才子一枚',
        '4': '百度FE',
        '5': '创业者',
      };
      return config[state];
    }
  },
  {
    title: '爱好',
    dataIndex: 'interest',
    width: 100,
    render: (abc) => {
      let config = {
        '1': '🏊‍',
        '2': '🏀',
        '3': '⚽',
        '4': '🏃',
        '5': '🏔',
        '6': '🚴',
        '7': '🎱',
        '8': '🎤',
      };
      return config[abc];
    }
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    width: 100
  },
  {
    title: '联系地址',
    dataIndex: 'address',
    width: 100
  },
  {
    title: '早起时间',
    dataIndex: 'time',
    width: 100
  }
];

export default columns;
