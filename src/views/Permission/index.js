import React, { Component, Fragment } from "react";
import { Card, Button, Modal, message } from "antd";
import ETable from "../../components/ETable";
import ServiceRequest from "../../serviceRequest";
import pagination from "../../utils/pagination";
import RoleForm from "./RoleForm";
import PermEditForm from "./PermEditForm";
import columns from "./columns";

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
    this.columns = columns
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

export default Permission;
