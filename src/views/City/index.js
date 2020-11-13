import React, { Component } from "react";
import { Card, Button, Table, Form, Select, Modal, Radio, message } from "antd";
import moment from "moment";
import ServiceRequest from "../../serviceRequest";
import { pagination } from "../../utils/pagination";

/**查询筛选表单*/
class FilterForm extends Component {
  handleReset = () => {
    this.props.form.resetFields()
  }

  handleSearchClick = () => {
    this.props.search(this.props.form.getFieldsValue())
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <Form.Item label="城市">
          {
            getFieldDecorator('city_id')(
              <Select placeholder="全部" style={{width: 100}}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">北京市</Select.Option>
                <Select.Option value="2">天津市</Select.Option>
                <Select.Option value="3">深圳市</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="用车模式">
          {
            getFieldDecorator('mode')(
              <Select placeholder="全部" style={{width: 125}}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">指定停车点模式</Select.Option>
                <Select.Option value="2">禁停区模式</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="运营模式">
          {
            getFieldDecorator('op_mode')(
              <Select placeholder="全部" style={{width: 80}}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">自营</Select.Option>
                <Select.Option value="2">加盟</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="加盟商授权状态">
          {
            getFieldDecorator('auth_status')(
              <Select placeholder="全部" style={{width: 100}}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">已授权</Select.Option>
                <Select.Option value="2">未授权</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{margin: '0 20px'}}
                  onClick={this.handleSearchClick}
          >
            查询
          </Button>
          <Button onClick={this.handleReset}>重置</Button>
        </Form.Item>
      </Form>
    )
  }
}

FilterForm = Form.create()(FilterForm);

/**开通城市表单*/
class OpenCityForm extends Component {
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal">
        <Form.Item label="选择城市" {...formItemLayout}>
          {
            getFieldDecorator('city_id', {
              initialValue: '1'
            })(
              <Select style={{width: 100}}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">北京市</Select.Option>
                <Select.Option value="2">天津市</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="运营模式" {...formItemLayout}>
          {
            getFieldDecorator('op_mode', {
              initialValue: '1'
            })(
              <Radio.Group style={{width: 200}}>
                <Radio value="1">自营</Radio>
                <Radio value="2">加盟</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
        <Form.Item label="用车模式" {...formItemLayout}>
          {
            getFieldDecorator('use_mode', {
              initialValue: '1'
            })(
              <Radio.Group style={{width: 200}}>
                <Radio value="1">指定停车点</Radio>
                <Radio value="2">禁停区</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
      </Form>
    );
  }
}

OpenCityForm = Form.create()(OpenCityForm);

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isShowOpenCity: false,
      columns: [
        {
          title: '城市Id',
          dataIndex: 'id'
        },
        {
          title: '城市名称',
          dataIndex: 'name'
        },
        {
          title: '用车模式',
          dataIndex: 'mode',
          render: (mode) => (
            mode === 1 ? '禁停区' : '停车点'
          )
        },
        {
          title: '运营模式',
          dataIndex: 'op_mode',
          render: (op_mode) => (
            op_mode === 1 ? '自营' : '加盟'
          )
        },
        {
          title: '授权加盟商',
          dataIndex: 'franchisee_name'
        },
        {
          title: '城市管理员',
          dataIndex: 'city_admins',
          render(arr) {
            return arr
              .map((item) => {
                return item.user_name
              })
              .join(',')
          }
        },
        {
          title: '城市开通时间',
          dataIndex: 'open_time'
        },
        {
          title: '操作时间',
          dataIndex: 'update_time',
          render(update_time) {
            return (
              moment(update_time).format('YYYY-MM-DD HH:mm:ss')
            );
          }
        },
        {
          title: '操作人',
          dataIndex: 'sys_user_name'
        }
      ]
    };
    this.params = {
      page: 1
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillMount() {
    this.requestList();
  }

  requestList = () => {
    ServiceRequest.axios({
      url: '/open_city',
      method: 'get',
      data: {
        isEasyMock: true,
        params: {
          page: this.params.page
        },
        isShowLoading: true
      }
    }).then(res => {
      console.log(res)
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
      })
    })
  }

  // 查询城市功能
  handleSearch = (info) => {
    console.log(info);
    ServiceRequest.axios({
      url: '/city/search',
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

  //开通城市弹出框
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    });
  }

  //开通城市表单提交
  handleSubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue();
    console.log(cityInfo);
    ServiceRequest.axios({
      url: '/city/open',
      method: 'get',
      data: {
        isEasyMock: true,
        params: cityInfo,
        isShowLoading: true
      }
    }).then(res => {
      if (res.code === 0) {
        message.success(`${res.result}`);
        this.setState({
          isShowOpenCity: false
        });
        this.requestList();
      }
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Card>
          <FilterForm wrappedComponentRef={(inst) => {this.filterForm = inst}}
                      search={this.handleSearch}
          />
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={this.handleOpenCity}>
            开通城市
          </Button>
        </Card>
        <div className="content-wrap">
          <Table bordered columns={this.state.columns}
                 dataSource={this.state.dataSource}
                 pagination={this.state.pagination}
          />
        </div>
        <Modal title="开通城市" visible={this.state.isShowOpenCity}
               onCancel={() => this.setState({isShowOpenCity: false})}
               onOk={this.handleSubmit}
        >
          <OpenCityForm wrappedComponentRef={(inst) => {this.cityForm = inst}}/>
        </Modal>
      </div>
    );
  }
}

export default City;
