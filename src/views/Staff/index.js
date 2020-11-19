import React, { Component } from "react";
import { Card, Button, Modal, message } from "antd";
import ETable from "../../components/ETable";
import FilterForm from "../../components/FilterForm";
import ServiceRequest from "../../serviceRequest";
import pagination from "../../utils/pagination";
import UserForm from "./UserForm";
import userFormList from "./userFormList";
import columns from "./columns";

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
    this.params = {
      page: 1
    };
    this.userFormList = userFormList;
    this.columns = columns;
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

export default Staff;
