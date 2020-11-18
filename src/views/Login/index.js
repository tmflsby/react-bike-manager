import React, { Component, Fragment } from "react";
import { Card, Form, Input, Button, Icon, Checkbox, message } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleLogin } from "../../store/actionCreator";
import ServiceRequest from "../../serviceRequest";
import "./login.less";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    let userInfo = this.props.form.getFieldsValue();

    this.props.form.validateFields((error) => {
      if (!error) {
        ServiceRequest.axios({
          url: '/login',
          method: 'post',
          data: {
            isEasyMock: true,
            params: {
              userName: userInfo.userName,
              pwd: userInfo.userPwd
            },
            isShowLoading: true
          }
        }).then(res => {
          message.success(`登录成功！`);
          dispatch(handleLogin(res.result.data.token));
          localStorage.setItem('token', JSON.stringify(res.result.data.token))
        }).catch(error => {
          console.log(error);
        });
      }
    })
  }

  render() {
    const token = this.props.token;
    const { getFieldDecorator } = this.props.form;

    if (token) {
      return (
        <Redirect to='/home'/>
      );
    } else {
      return (
        <Fragment>
          <div className='login-page'>
            <header className='login-header'>
              <div className='login-logo'>
                <img src="/assets/logo-ant.svg" alt="共享单车后台管理系统"/>
                React + AntD 后台管理系统
              </div>
            </header>
            <div className='login-content-wrap'>
              <div className='login-content'>
                <div className='word'>
                  共享出行
                  <br/>
                  引领城市新经济
                </div>
                <div className='login-box' >
                  <div className='title'>欢迎你，请先登录</div>
                  <Card>
                    <Form style={{ width: 260 }}>
                      <Form.Item>
                        {
                          getFieldDecorator('userName', {
                            initialValue: '',
                            rules: [
                              {
                                required: true,
                                message: '用户名不为空'
                              },
                              {
                                min: 5,
                                max: 10,
                                message: '用户名长度不在范围内'
                              },
                              {
                                pattern: new RegExp('^\\w+$', 'g'),
                                message: '用户名必须为字母或者数字'
                              }
                            ]
                          })(
                            <Input prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
                          )
                        }
                      </Form.Item>
                      <Form.Item>
                        {
                          getFieldDecorator('userPwd', {
                            initialValue: '',
                            rules: [
                              {
                                required: true,
                                message: '密码不为空'
                              }
                            ]
                          })(
                            <Input type="password" prefix={<Icon type="lock"/>} placeholder="请输入密码" />
                          )
                        }
                      </Form.Item>
                      <Form.Item>
                        {
                          getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: false,
                            rules: []
                          })(
                            <Checkbox>记住密码</Checkbox>
                          )
                        }
                        <a href="#/login" style={{ float: 'right' }}>忘记密码</a>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" block onClick={this.handleSubmit}>登录</Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )
    }
  }
}

const mapState = (state) => ({
  token: state.token
})

export default connect(mapState, null)(Form.create()(Login));
