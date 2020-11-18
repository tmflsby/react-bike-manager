import React, { Component } from "react";
import { Card, Button, Form, Modal, message } from "antd";
import FilterForm from "../../components/FilterForm";
import ETable from "../../components/ETable";
import ServiceRequest from "../../serviceRequest";
import pagination from "../../utils/pagination";
import "../../style/common.less"

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: {},
      orderConfirmVisible: false
    };
    this.params = {
      page: 1
    };
    this.columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn',
        width: 150
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn',
        width: 150
      },
      {
        title: '用户名',
        align: 'center',
        dataIndex: 'user_name',
        width: 80
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        width: 150
      },
      {
        title: '里程',
        dataIndex: 'distance',
        align: 'center',
        width: 80,
        render: (distance) => distance / 1000 + ' km'
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time',
        align: 'center',
        width: 100
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
        align: 'center',
        render: (status) => status === 1 ? '进行中' : '行程结束'
      },
      {
        title: '开始时间',
        dataIndex: 'start_time',
        width: 150
      },
      {
        title: '结束时间',
        dataIndex: 'end_time',
        width: 150
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee',
        align: 'center',
        width: 100
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay',
        width: 100,
        align: 'center'
      }
    ];
    this.orderFormList = [
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
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    ServiceRequest.axios({
      url: '/order/list',
      method: 'get',
      data: {
        isEasyMock: true,
        params: {
          page: this.params.page
        },
        isShowLoading: true
      }
    }).then(res => {
      res.result.item_list.map((item, index) => {
        item.key = index
        return item
      });
      this.setState({
        dataSource: res.result.item_list,
        pagination: pagination(res, (current) => {
          this.params.page = current;
          this.requestList();
        })
      });
    }).catch(error => {
      console.log(error);
    });
  }

  //查询订单
  handleSearch = (info) => {
    ServiceRequest.axios({
      url: '/order/search',
      method: 'get',
      data: {
        isEasyMock: true,
        params: info,
        isShowLoading: true
      }
    }).then(res => {
      if (res.code === 0) {
        message.success(`${res.result}`);
        this.requestList();
      }
    }).catch(error => {
      console.log(error);
    });
  }

  //打开订单详情页
  openOrderDetails = () => {
    let item = this.state.selectedItem;

    if (!item) {
      Modal.info({
        title: '提示',
        content: '请先选择一条订单'
      });
      return;
    }
    window.open(`/#/common/order/detail/${item.id}/${item.user_name}/${item.order_sn}`, '_blank')
  }

  //结束订单-确认车辆信息
  handleConfirm = () => {
    let item = this.state.selectedItem;

    if (!item) {
      Modal.info({
        title: '温馨提示',
        content: '请选择需要操作的订单'
      });
      return;
    }

    if (item.status === 2) {
      Modal.info({
        title: '温馨提示',
        content: '该订单行程已结束'
      });
      return;
    }

    ServiceRequest.axios({
      url: '/order/ebike_info',
      method: 'get',
      data: {
        isEasyMock: true,
        params: {
          orderId: item.id
        },
        isShowLoading: true
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          orderInfo: res.result,
          orderConfirmVisible: true
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }

  //结束订单
  handleFinishOrder = () => {
    ServiceRequest.axios({
      url: '/order/finish_order',
      method: 'get',
      data: {
        isEasyMock: true,
        params: {
          orderId: this.state.selectedItem.id
        },
        isShowLoading: true
      }
    }).then(res => {
      if (res.code === 0) {
        message.success(`${res.msg}`);
        this.setState({
          orderConfirmVisible: false
        });
        this.requestList();
      }
    }).catch(error => {
      console.log(error);
    });
  }

  /**
   * ETable 行点击通用函数
   * @param {Array} selectedRowKeys 选中行的索引
   * @param {Object} selectedRows 选中行的数据
   * @param {Number} selectedIds
   */
  updateSelectedItem = (selectedRowKeys, selectedRows, selectedIds) => {
    if (selectedIds) {
      this.setState({
        selectedRowKeys,
        selectedIds: selectedIds,
        selectedItem: selectedRows
      })
    } else {
      this.setState({
        selectedRowKeys,
        selectedItem: selectedRows
      })
    }
  }

  render() {
    return (
      <div>
        <Card>
          <FilterForm formList={this.orderFormList} filterSubmit={this.handleSearch}/>
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={this.openOrderDetails}>
            订单详情
          </Button>
          <Button type="primary" onClick={this.handleConfirm} style={{marginLeft: 20}}>
            结束订单
          </Button>
        </Card>

        <div className="content-wrap">
          <ETable columns={this.columns} dataSource={this.state.dataSource}
                  updateSelectedItem={this.updateSelectedItem}
                  pagination={this.state.pagination}
                  selectedRowKeys={this.state.selectedRowKeys}
                  selectedItem={this.state.selectedItem}
                  selectedIds={this.state.selectedIds}
                  rowSelection="radio"
          />
        </div>

        <Modal title="结束订单" visible={this.state.orderConfirmVisible}
               width={400} onOk={this.handleFinishOrder}
               onCancel={() => {
                 this.setState({
                   orderConfirmVisible: false
                 });
               }}
        >
          <FinishOrderForm {...this.state.orderInfo}/>
        </Modal>
      </div>
    );
  }
}

//结束订单子组件
class FinishOrderForm extends Component {
  render() {
    const { bike_sn, battery, start_time, location } = this.props;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    return (
      <Form layout="horizontal">
        <Form.Item {...formItemLayout} label="车辆编号">
          {bike_sn}
        </Form.Item>
        <Form.Item {...formItemLayout} label="剩余电量">
          {battery + '%'}
        </Form.Item>
        <Form.Item {...formItemLayout} label="行程开始时间">
          {start_time}
        </Form.Item>
        <Form.Item {...formItemLayout} label="当前位置">
          {location}
        </Form.Item>
      </Form>
    )
  }
}

FinishOrderForm = Form.create()(FinishOrderForm)

export default Order;
