// 权限设置表单子组件
import React, {Component, Fragment} from "react";
import {Form, Input, Select, Tree} from "antd";
import menuList from "../../config/menuConfig";

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

export default Form.create()(PermEditForm);
