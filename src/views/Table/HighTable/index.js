import React, { Component } from "react";
import { Card, message, Modal, Table } from "antd";
import ServiceRequest from "../../../serviceRequest";
import pagination  from "../../../utils/pagination";
import columns from "./columns";

class HighTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns1: columns.columns1,
      columns2: columns.columns2,
      columns3: columns.columns3,
      columns4: columns.columns4,
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
    }).catch(error => {
      console.log(error);
    });
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
