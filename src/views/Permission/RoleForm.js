// 创建角色表单子组件
import React, {Component, Fragment} from "react";
import {Form, Input, Select} from "antd";

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

export default Form.create()(RoleForm);
