//表单子组件
import React, {Component} from "react";
import {DatePicker, Form, Input, Radio, Select} from "antd";
import moment from "moment";

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

export default Form.create()(UserForm);
