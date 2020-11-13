import React, { Component } from "react";
import { Badge, Button, Card, message, Modal, Table } from "antd";
import ServiceRequest from "../../serviceRequest";
import pagination  from "../../utils/pagination";

class HighTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
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
    this.params = {
      page: 1
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.getMockTableListData();
  }

  getMockTableListData() {
    let _this = this;
    ServiceRequest.axios({
      url: '/table/high/list',
      method: 'get',
      data: {
        isEasyMock: true,
        params: {
          page: this.state.page
        },
        isShowLoading: true
      }
    }).then((res) => {
      res.result.list.map(item => {
        item.key = item.id;
        return item;
      });
      this.setState({
        dataSource: res.result.list,
        selectedRowKeys: [],
        selectedRows: null,
        pagination: pagination(res, current => {
          _this.params.page = current;
          this.getMockTableListData();
        })
      });
    })
  }

  // 删除操作
  handleDelete(item) {
    Modal.confirm({
      title: '确认',
      content: `您确认删除${item.userName}吗`,
      onOk: () => {
        message.success('删除成功');
        this.getMockTableListData();
      }
    })
  }

  render() {
    return (
      <div>
        <Card title='头部固定' className='card-wrap'>
          <Table bordered columns={this.state.columns}
                 dataSource={this.state.dataSource}
                 pagination={false}
                 scroll={{y: 240}}
          />
        </Card>
        <Card title='左侧固定' className='card-wrap'>
          <Table bordered columns={this.state.columns2}
                 dataSource={this.state.dataSource}
                 pagination={false}
                 scroll={{x: 1000}}
          />
        </Card>
        <Card title='表格排序' className='card-wrap'>
          <Table bordered columns={this.state.columns3}
                 dataSource={this.state.dataSource}
                 pagination={false}
          />
        </Card>
        <Card title='操作按钮' className='card-wrap'>
          <Table bordered columns={this.state.columns4}
                 dataSource={this.state.dataSource}
                 pagination={false}
          />
        </Card>
      </div>
    );
  }
}

export default HighTable;
