import React, { Component } from "react";
import { Button, Card, message, Modal, Table } from "antd";
import ServiceRequest from "../../../serviceRequest";
import pagination  from "../../../utils/pagination";
import columns from "./columns";

class BasicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns
    };
    this.params = {
      page: 1
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const dataSource = [
      {
        id: '0',
        userName: '梅西',
        sex: '1',
        state: '1',
        hobby: '1',
        birthday: '2020-02-02',
        address: '西班牙巴塞罗那市诺坎普球场',
        time: '09:00:00'
      },
      {
        id: '1',
        userName: '内马尔',
        sex: '1',
        state: '1',
        hobby: '1',
        birthday: '2020-02-02',
        address: '西班牙巴塞罗那市诺坎普球场',
        time: '09:00:00'
      },
      {
        id: '2',
        userName: '苏亚雷斯',
        sex: '1',
        state: '1',
        hobby: '1',
        birthday: '2020-02-02',
        address: '西班牙巴塞罗那市诺坎普球场',
        time: '09:00:00'
      }
    ];
    dataSource.map(item => {
      item.key = item.id;
      return item
    });
    this.setState({
      dataSource
    });
    this.getMockTableListData();
  }

  getMockTableListData () {
    ServiceRequest.axios({
      url: '/table/list',
      method: 'get',
      data: {
        isEasyMock: true,
        params: {
          page: this.params.page
        },
        isShowLoading: true
      }
    }).then((res) => {
      res.result.list.map(item => {
        item.key = item.id;
        return item;
      });
      this.setState({
        dataSource2: res.result.list,
        selectedRowKeys: [],
        selectedRows: null,
        pagination: pagination(res, current => {
          this.params.page = current;
          this.getMockTableListData();
        })
      });
    }).catch(error => {
      console.log(error);
    });
  }

  onRowClick(record) {
    let selectKey = [record.key];
    Modal.info({
      title: '信息',
      content: `用户名:${record.userName},地址:${record.address}`
    });
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    });
  }

  // 多选执行删除动作
  handleDelete() {
    let rows = this.state.selectedRows;
    let ids = [];
    rows.map(item => {
      ids.push(item.id);
      return ids
    });
    Modal.confirm({
      title: '删除提示',
      content: `你确定要删除${ids.join(',')}吗`,
      onOk: () => {
        message.success('删除成功');
        this.getMockTableListData();
      }
    })
  }

  render() {
    return (
      <div>
        <Card title='基础表格' className='card-wrap'>
          <Table columns={this.state.columns}
                 dataSource={this.state.dataSource}
                 bordered pagination={false}
          />
        </Card>
        <Card title='动态数据渲染表格-Mock' className='card-wrap'>
          <Table columns={this.state.columns}
                 dataSource={this.state.dataSource2}
                 pagination={true}
          />
        </Card>
        <Card title='Mock-单选' className='card-wrap'>
          <Table columns={this.state.columns}
                 dataSource={this.state.dataSource2}
                 bordered pagination={true}
                 rowSelection={{
                   type: 'radio',
                   selectedRowKeys: this.state.selectedRowKeys,
                   onChange: (selectedRowKeys, selectedRows) =>
                   {
                     this.setState({
                       selectedRowKeys,
                       selectedRows
                     })
                   }
                 }}
                 onRow={record => {
                   return {
                     onClick: () => {
                       this.onRowClick(record);
                     }
                   };
                 }}
          />
        </Card>
        <Card title='Mock-复选' className='card-wrap'>
          <div>
            <Button style={{marginBottom: 10}} onClick={this.handleDelete}>删除</Button>
          </div>
          <Table columns={this.state.columns}
                 dataSource={this.state.dataSource2}
                 bordered pagination={true}
                 rowSelection={{
                   type: 'checkbox',
                   selectedRowKeys: this.state.selectedRowKeys,
                   onChange: (selectedRowKeys, selectedRows) => {
                     this.setState({
                       selectedRowKeys,
                       selectedRows
                     })
                   }
                 }}
          />
        </Card>
        <Card title='Mock-表格分页' className='card-wrap'>
          <Table bordered
                 columns={this.state.columns}
                 dataSource={this.state.dataSource2}
                 pagination={this.state.pagination}
          />
        </Card>
      </div>
    );
  }
}

export default BasicTable;
