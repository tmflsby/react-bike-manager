import React, { Component, Fragment } from "react";
import { Card, Button, Modal, Form, Select, Input, Tree, message } from "antd";
import moment from "moment";
import ETable from "../../components/ETable";
import ServiceRequest from "../../serviceRequest";
import menuList from "../../config/menuConfig";
import pagination from "../../utils/pagination";

class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRoleVisible: false,
      isPermVisible: false
    };
    this.params = {
      page: 1
    };
    this.columns = [
      {
        title: '角色ID',
        width: 50,
        dataIndex: 'id'
      },
      {
        title: '角色名称',
        width: 100,
        dataIndex: 'role_name'
      },
      {
        title: '创建时间',
        width: 200,
        dataIndex: 'create_time',
        render: (create_time) => moment(create_time).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '使用状态',
        width: 100,
        dataIndex: 'status',
        render: (status) => status === 1 ? '启用' : '停用'
      },
      {
        title: '授权时间',
        width: 200,
        dataIndex: 'authorize_time',
        render: () => moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '授权人',
        width: 100,
        dataIndex: 'authorize_user_name'
      }
    ];
  }

  componentDidMount() {
    this.requestList()
  }

  // 请求权限列表数据
  requestList = () => {
    ServiceRequest.axios({
      url: '/role/list',
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

  // 弹出创建角色Modal框
  handleCreateRole = () => {
    this.setState({
      isRoleVisible: true
    });
  }

  //权限设置弹框
  OpenSettingPermissions = () => {
    if (!this.state.selectedItem) {
      Modal.info({
        title: '温馨提示',
        content: '请选择一个角色'
      });
      return;
    }
    this.setState({
      isPermVisible: true,
      detailInfos: this.state.selectedItem,
      menus: this.state.selectedItem.menus
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

  // 创建角色表单提交
  handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue();
    ServiceRequest.axios({
      url: '/role/create',
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
        message.success(`${res.result}`);
        this.setState({
          isRoleVisible: false
        });
        this.roleForm.props.form.resetFields();
        this.requestList();
      }
    }).catch(error => {
      console.log(error);
    });
  }

  // 提交权限设置
  handleSettingPermission = () => {
    let data = this.permForm.props.form.getFieldsValue();
    data.role_id = this.state.selectedItem.id;
    data.menus = this.state.menus;
    ServiceRequest.axios({
      url: '/permission/edit',
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
        message.success(`${res.result}`)
        this.setState({
          isPermVisible: false
        });
        this.requestList();
      }
    })
  }

  render() {
    return (
      <Fragment>
        <Card>
          <Button type="primary" onClick={this.handleCreateRole}>
            创建角色
          </Button>
          <Button type="primary" onClick={this.OpenSettingPermissions} style={{ margin: "0 10px" }}>
            设置权限
          </Button>
          <Button type="primary">用户授权</Button>
        </Card>
        <div className="content-wrap">
          <ETable columns={this.columns} dataSource={this.state.dataSource}
                  pagination={this.state.pagination}
                  selectedRowKeys={this.state.selectedRowKeys}
                  selectedItem={this.state.selectedItem}
                  selectedIds={this.state.selectedIds}
                  updateSelectedItem={this.updateSelectedItem}
                  rowSelection="radio"
          />
        </div>
        <Modal title="创建角色" visible={this.state.isRoleVisible}
               onOk={this.handleRoleSubmit}
               onCancel={() => {
                 this.roleForm.props.form.resetFields();
                 this.setState({
                   isRoleVisible: false
                 });
               }}
        >
          <RoleForm wrappedComponentRef={(inst) => (this.roleForm = inst)}/>
        </Modal>
        <Modal width={600} title="权限设置"
               visible={this.state.isPermVisible}
               onOk={this.handleSettingPermission}
               onCancel={() => {
                 this.setState({
                   isPermVisible: false
                 });
               }}
        >
          <PermEditForm detailInfo={this.state.detailInfos}
                        menuInfo={this.state.menus}
                        patchMenuInfo={(checkedKeys) => {
                          this.setState({
                            menus: checkedKeys
                          });
                        }}
                        wrappedComponentRef={(inst) => (this.permForm = inst)}
          />
        </Modal>
      </Fragment>
    );
  }
}

// 创建角色表单子组件
class RoleForm extends Component {
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 }
    };
    const { getFieldDecorator } = this.props.form;

    return (
      <Fragment>
        <Form layout="horizontal">
          <Form.Item label="角色名称" {...formItemLayout}>
            {
              getFieldDecorator('role_name')(
                <Input type="text" placeholder="请输入角色名称" />
              )
            }
          </Form.Item>
          <Form.Item label="状态" {...formItemLayout}>
            {
              getFieldDecorator('state')(
                <Select>
                  <Select.Option value={1}>开启</Select.Option>
                  <Select.Option value={0}>关闭</Select.Option>
                </Select>
              )
            }
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

RoleForm = Form.create()(RoleForm);

// 权限设置表单子组件
class PermEditForm extends Component {
  // 遍历、展开所有树形节点
  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <Tree.TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </Tree.TreeNode>
      );
    } else {
      return <Tree.TreeNode {...item}/>
    }
  });

  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys);
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 }
    };
    const { getFieldDecorator } = this.props.form;
    const detail_Info = this.props.detailInfo;
    const menu_Info = this.props.menuInfo;

    return (
      <Fragment>
        <Form layout="horizontal">
          <Form.Item label="角色名称" {...formItemLayout}>
            <Input type="text" disabled placeholder={detail_Info.role_name}/>
          </Form.Item>
          <Form.Item label="状态" {...formItemLayout}>
            {
              getFieldDecorator('status', {
                initialValue: "1"
              })(
                <Select>
                  <Select.Option value="1">启用</Select.Option>
                  <Select.Option value="0">停用</Select.Option>
                </Select>
              )
            }
          </Form.Item>
        </Form>
        <Tree checkable defaultExpandAll
              onCheck={(checkedKeys) => {
                this.onCheck(checkedKeys);
              }}
              checkedKeys={menu_Info}
        >
          <Tree.TreeNode title="平台权限" key="platform_all">
            {this.renderTreeNodes(menuList)}
          </Tree.TreeNode>
        </Tree>
      </Fragment>
    )
  }
}

PermEditForm = Form.create()(PermEditForm);

export default Permission;
