const options = {
  option1: {
    title: {
      text: '用户骑行订单'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
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
        type: 'bar',
        data: [1000, 2000, 3000, 5500, 4700, 3500, 900]
      }
    ]
  },
  option2: {
    title: {
      text: '用户骑行订单'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['OFO', '摩拜', '小蓝']
    },
    xAxis: {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'OFO',
        type: 'bar',
        data: [5000, 2040, 3600, 7500, 8700, 9500, 19000]
      },
      {
        name: '摩拜',
        type: 'bar',
        data: [7600, 4300, 5400, 5500, 4700, 7500, 17000]
      },
      {
        name: '小蓝',
        type: 'bar',
        data: [4000, 6700, 3400, 8700, 2300, 7800, 12000]
      },
    ]
  }
};

export default options;
