import {Badge, Button} from "antd";
import React from "react";

const columns = {
  columns1: [
    {
      title: 'id',
      width: 80,
      dataIndex: 'id'
    },
    {
      title: '用户名',
      width: 80,
      dataIndex: 'userName'
    },
    {
      title: '性别',
      width: 80,
      dataIndex: 'sex',
      render(sex) {
        return (sex === 1 ? '男' : '女');
      }
    },
    {
      title: '状态',
      width: 100,
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
      width: 100,
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
      width: 100,
      dataIndex: 'birthday'
    },
    {
      title: '地址',
      width: 120,
      dataIndex: 'address'
    },
    {
      title: '早起时间',
      width: 80,
      dataIndex: 'time'
    }
  ],
  columns2: [
    {
      title: 'id',
      width: 100,
      fixed: 'left',
      dataIndex: 'id'
    },
    {
      title: '用户名',
      width: 100,
      fixed: 'left',
      dataIndex: 'userName'
    },
    {
      title: '性别',
      width: 200,
      dataIndex: 'sex',
      render(sex) {
        return (sex === 1 ? '男' : '女');
      }
    },
    {
      title: '状态',
      width: 200,
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
      width: 200,
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
      width: 200,
      dataIndex: 'birthday'
    },
    {
      title: '地址',
      width: 200,
      dataIndex: 'address'
    },
    {
      title: '早起时间',
      width: 100,
      fixed: 'right',
      dataIndex: 'time'
    }
  ],
  columns3: [
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
      title: '年龄',
      dataIndex: 'age',
      sorter: (a, b) => {
        return (a.age - b.age);
      },
      defaultSortOrder: 'ascend'
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
  ],
  columns4: [
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
          '1': <Badge status='success' text='踢足球'/>,
          '2': <Badge status='default' text='打篮球'/>,
          '3': <Badge status='error' text='打羽毛球'/>,
          '4': <Badge status='processing' text='打台球'/>,
          '5': <Badge status='warning' text='打游戏'/>
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
      title: '操作',
      render: (item) => {
        return <Button size="small" onClick={() => {this.handleDelete(item)}}>删除</Button>
      }
    }
  ]
};

export default columns;
