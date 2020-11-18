import React, { Component } from "react";
import { Card, Button, Modal, Form, Input, Radio, Select, DatePicker, message } from "antd";
import moment from "moment";
import ETable from "../../components/ETable";
import FilterForm from "../../components/FilterForm";
import ServiceRequest from "../../serviceRequest";
import pagination from "../../utils/pagination";

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
    this.params = {
      page: 1
    };
    this.userFormList = [
      {
        type: 'INPUT',
        label: '用户名',
        field: 'user_name',
        placeholder: '请输入用户名',
        width: 140,
      },
      {
        type: 'INPUT',
        label: '用户手机号',
        field: 'user_mobile',
        placeholder: '请输入用户手机号',
        width: 140,
      },
      {
        type: 'DATE',
        label: '请选择入职日期',
        field: 'user_date',
        placeholder: '请选择日期',
      }
    ];
    this.columns = [
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
    this.footer = {};
  }

  componentDidMount() {
    this.requestList();
  }

  //请求表格列表
  requestList = () => {
    ServiceRequest.axios({
      url: '/user/list',
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

  // 处理表单查询
  handleFilter = (params) => {
    // 从子组件传来的值赋值给 params
    this.params = params;
    this.requestList();
  }

  // 功能区操作
  handleOperate = (type) => {
    if (type === 'detail') {
      if (!this.state.selectedItem) {
        Modal.info({
          title: '温馨提示',
          content: '请先选择一个员工'
        })
        return;
      }

      this.setState({
        type,
        isVisible: true,
        title: '编辑员工信息',
        userInfo: this.state.selectedItem
      });
    } else if (type === 'create') {
      this.setState({
        type,
        isVisible: true,
        title: '创建员工'
      });
    } else if (type === 'edit') {
      if (!this.state.selectedItem) {
        Modal.info({
          title: '温馨提示',
          content: '请先选择一个员工'
        })
        return;
      }

      this.setState({
        type,
        isVisible: true,
        title: '编辑员工信息',
        userInfo: this.state.selectedItem
      });
    } else if (type === 'delete') {
      if (!this.state.selectedItem) {
        Modal.info({
          title: '温馨提示',
          content: '请先选择一个员工'
        })
        return;
      }

      Modal.confirm({
        title: '确认删除',
        content: `是否要删除当前选中的员工 ${this.state.selectedItem.username} ${this.state.selectedItem.sex === 1 ? '男' : '女'}`,
        onOk: () => {
          ServiceRequest.axios({
            url: '/user/delete',
            method: 'get',
            data: {
              isEasyMock: true,
              params: {
                id: this.state.selectedItem.id
              },
              isShowLoading: true
            }
          }).then(res => {
            if (res.code === 0) {
              this.setState({
                isVisible: false,
                selectedRowKeys: ''
              });
              message.success(`${res.result}`);
              this.requestList();
            }
          }).catch(error => {
            console.log(error);
          });
        }
      });
    }
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

  //创建员工提交
  handleSubmit = () => {
    let type = this.state.type;
    let data = this.userForm.props.form.getFieldsValue();
    ServiceRequest.axios({
      url: type === 'create' ? '/user/add' : '/user/edit',
      method: 'get',
      data: {
        isEasyMock: true,
        params: {
          params: data
        },
        isShowLoading: true
      }
    }).then((res) => {
      if (res.code === 0) {
        this.userForm.props.form.resetFields();
        this.setState({
          isVisible: false,
          // selectedRowKeys:'' // 查询完后,单选框失去焦点
        });
        message.success(`${res.result}`)
        this.requestList();
      }
    }).catch(error => {
      console.log(error);
    });
  }

    render() {
    if (this.state.type === 'detail') {
      this.footer = {
        footer: null
      };
    }

    return (
      <div>
        <Card>
          <FilterForm formList={this.userFormList} filterSubmit={this.handleFilter}/>
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={() => this.handleOperate('detail')}>员工详情</Button>
          <Button style={{marginLeft: 10}} type="primary" icon="plus" onClick={() => this.handleOperate('create')}>创建员工</Button>
          <Button style={{marginLeft: 10}} type="primary" icon="edit" onClick={() => this.handleOperate('edit')}>编辑员工</Button>
          <Button style={{marginLeft: 10}} type="danger" icon="delete" onClick={() => this.handleOperate('delete')}>删除员工</Button>
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
        <Modal style={{ top: 20 }} width={600}
               {...this.footer}
               title={this.state.title}
               visible={this.state.isVisible}
               onOk={this.handleSubmit}
               onCancel={() => {
                 this.userForm.props.form.resetFields();
                 this.setState({
                   isVisible: false,
                   userInfo: ''
                 });
               }}
        >
          <UserForm type={this.state.type} userInfo={this.state.userInfo}
                    wrappedComponentRef={(inst) => this.userForm = inst}
          />
        </Modal>
      </div>
    );
  }
}

//表单子组件
class UserForm extends Component {
  getState = (state) => {
    let config = {
      '1': "咸🐟一条",
      '2': '风华浪子',
      '3': '北大才子一枚',
      '4': '百度FE',
      '5': '创业者',
    };
    return config[state];
  }

  render() {
    let type = this.props.type;
    let userInfo = this.props.userInfo || {};
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="horizontal">
        <Form.Item label="用户名" {...formItemLayout}>
          {
            userInfo && type === 'detail' ? userInfo.username :
              getFieldDecorator('user_name', {
                initialValue: userInfo.username
              })(
                <Input type="text" placeholder="请输入用户名"/>
              )
          }
        </Form.Item>
        <Form.Item label="性别" {...formItemLayout}>
          {
            userInfo && type === 'detail' ? userInfo.sex === 1 ? '男' : '女' :
              getFieldDecorator('sex', {
                initialValue: userInfo.sex
              })(
                <Radio.Group>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
              )
          }
        </Form.Item>
        <Form.Item label="状态" {...formItemLayout}>
          {
            userInfo && type === 'detail' ? this.getState(userInfo.state) :
              getFieldDecorator('state', {
                initialValue: userInfo.state
              })(
                <Select>
                  <Select.Option value={1}>咸鱼一条</Select.Option>
                  <Select.Option value={2}>风华浪子</Select.Option>
                  <Select.Option value={3}>北大才子一枚</Select.Option>
                  <Select.Option value={4}>百度FE</Select.Option>
                  <Select.Option value={5}>创业者</Select.Option>
                </Select>
              )
          }
        </Form.Item>
        <Form.Item label="生日" {...formItemLayout}>
          {
            userInfo && type === 'detail' ? userInfo.birthday :
              getFieldDecorator('birthday', {
                initialValue: moment(userInfo.birthday)
              })(
                <DatePicker format="YYYY-MM-DD"/>
              )}
        </Form.Item>
        <Form.Item label="联系地址" {...formItemLayout}>
          {
            userInfo && type === 'detail' ? userInfo.address :
              getFieldDecorator('address', {
                initialValue: userInfo.address
              })(
                <Input.TextArea rows={3} placeholder="请输入联系地址"/>
              )}
        </Form.Item>
      </Form>
    );
  }
}

UserForm = Form.create()(UserForm);

export default Staff;
