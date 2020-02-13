import React, { Component } from "react";
import {Button, Card, Form, Input, Icon, message, Checkbox } from "antd";

class FormLogin extends Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title='登录行内表单' className='card-wrap'>
          <Form layout='inline'>
            <Form.Item>
              <Input placeholder='请输入用户名'/>
            </Form.Item>
            <Form.Item>
              <Input placeholder='请输入密码'/>
            </Form.Item>
            <Form.Item>
              <Button type='primary'>登录</Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title='登录水平表单' className='card-wrap'>
          <Form style={{width: 300}}>
            <Form.Item>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    },
                    {
                      pattern: new RegExp('^\\w+$', 'g'),
                      message: '用户名必须为字母或者数字'
                    }
                  ]
                })(
                  <Input prefix={<Icon type='user'/>} placeholder='请输入用户名'/>
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('userPwd', {
                  initialValue: '',
                  rules: [
                    {
                      min: 5,
                      max: 10,
                      message: '长度不在范围内'
                    }
                  ]
                })(
                  <Input prefix={<Icon type='lock'/>} type='password' placeholder='请输入密码'/>
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('remember', {
                  initialValue: true,
                  valuePropName: 'checked'
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" style={{float: 'right'}}>忘记密码</a>
            </Form.Item>
            <Form.Item>
              <Button type='primary' onClick={this.handleSubmit}>登录</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }

  handleSubmit() {
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err) => {
      if (!err) {
        message.success(`${userInfo.userName} 恭喜您，您通过本次表单组件学习，当前密码为：${userInfo.userPwd}` )
      }
    })
  }
}

export default Form.create()(FormLogin);
