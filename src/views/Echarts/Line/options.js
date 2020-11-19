const options = {
  option1: {
    title: {
      text: '用户骑行菜单',
      x: 'center'
    },
    legend: {
      data: ['订单量'],
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '订单量',
        type: 'line',
        data: [1234, 5536, 7634, 7864, 9875, 4523, 5422]
      }
    ]
  },
  option2: {
    title: {
      text: '用户骑行菜单'
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['OFO订单量', '摩拜订单量'],
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
    },
    xAxis: {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'OFO订单量',
        type: 'line',
        data: [1234, 5536, 7634, 7864, 9875, 4523, 5422]
      },
      {
        name: '摩拜订单量',
        type: 'line',
        data: [8546, 6545, 4578, 6523, 1598, 5987, 7841]
      },
    ]
  },
  option3: {
    title: {
      text: '用户骑行菜单'
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['OFO订单量'],
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
    },
    xAxis: {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'OFO订单量',
        type: 'line',
        data: [1234, 5536, 7634, 7864, 9875, 4523, 5422],
        areaStyle: {}
      }
    ]
  },
  option4: {
    title: {
      text: '用户骑行菜单'
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['OFO订单量','摩拜订单量'],
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
    },
    xAxis: {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'OFO订单量',
        type: 'line',
        data: [1234, 5536, 7634, 7864, 9875, 4523, 5422],
        areaStyle: {}
      },
      {
        name: '摩拜订单量',
        type: 'line',
        data: [8546, 6545, 4578, 6523, 1598, 5987, 7841],
        areaStyle: {}
      }
    ]
  }
};

export default options;
