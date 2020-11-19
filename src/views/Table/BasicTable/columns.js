const columns =  [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '用户名',
    dataIndex: 'userName'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    render(sex) {
      return (sex === 1 ? '男' : '女');
    }
  },
  {
    title: '状态',
    dataIndex: 'state',
    render(state) {
      let config = {
        '1': '宇宙之大',
        '2': '绝代风华',
        '3': '如约而至',
        '4': '清明雨上',
        '5': '半城烟沙'
      };
      return config[state];
    }
  },
  {
    title: '爱好',
    dataIndex: 'hobby',
    render(hobby) {
      let config = {
        '1': '踢足球',
        '2': '打篮球',
        '3': '打羽毛球',
        '4': '打台球',
        '5': '看书',
        '6': '听歌',
        '7': '打游戏',
      };
      return config[hobby];
    }
  },
  {
    title: '生日',
    dataIndex: 'birthday'
  },
  {
    title: '地址',
    dataIndex: 'address'
  },
  {
    title: '早起时间',
    dataIndex: 'time'
  }
];

export default columns;
