import React, { Component } from "react";
import moment from "moment";
import {
  Card, Form, Input, InputNumber, Radio, Select, Switch, DatePicker,
  TimePicker, Upload, Icon, Checkbox, Button, message
} from "antd";

class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    };
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    };
    return (
      <div>
        <Card title='注册表单'>
          <Form layout='horizontal'>
            <Form.Item label='用户名' {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    }
                  ]
                })(
                  <Input placeholder='请输入用户名'/>
                )
              }
            </Form.Item>
            <Form.Item label='密码' {...formItemLayout}>
              {
                getFieldDecorator('userPwd', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      min: 5,
                      max: 10,
                      message: '长度不在范围内'
                    }
                  ]
                })(
                  <Input type='password' placeholder='请输入密码'/>
                )
              }
            </Form.Item>
            <Form.Item label='性别' {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  initialValue: ''
                })(
                  <Radio.Group>
                    <Radio value='1'>男</Radio>
                    <Radio value='2'>女</Radio>
                  </Radio.Group>
                )
              }
            </Form.Item>
            <Form.Item label='年龄' {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: 18
                })(
                  <InputNumber/>
                )
              }
            </Form.Item>
            <Form.Item label='当前状态' {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: ['1', '2']
                })(
                  <Select mode='multiple'>
                    <Select.Option value='1'>不如吃茶去</Select.Option>
                    <Select.Option value='2'>苏格拉没有底</Select.Option>
                    <Select.Option value='3'>青年晚报</Select.Option>
                    <Select.Option value='4'>自定义</Select.Option>
                    <Select.Option value='5'>梦游计</Select.Option>
                    <Select.Option value='6'>寻雾启示</Select.Option>
                    <Select.Option value='7'>寻宝游戏</Select.Option>
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item label='爱好' {...formItemLayout}>
              {
                getFieldDecorator('hobby', {
                  initialValue: ['1', '2']
                })(
                  <Select mode='multiple'>
                    <Select.Option value='1'>足球</Select.Option>
                    <Select.Option value='2'>篮球</Select.Option>
                    <Select.Option value='3'>羽毛球</Select.Option>
                    <Select.Option value='4'>台球</Select.Option>
                    <Select.Option value='5'>吉他</Select.Option>
                    <Select.Option value='6'>唱歌</Select.Option>
                    <Select.Option value='7'>看书</Select.Option>
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item label='是否已婚' {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  initialValue: true,
                  valuePropName: 'checked'
                })(
                  <Switch/>
                )
              }
            </Form.Item>
            <Form.Item label='生日' {...formItemLayout}>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment('2020-02-02')
                })(
                  <DatePicker showTime format='YYYY-MM-DD'/>
                )
              }
            </Form.Item>
            <Form.Item label='联系地址' {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: '西班牙巴塞罗那市诺坎普球场'
                })(
                  <Input.TextArea autoSize={
                    {
                      minRows: 4,
                      maxRows: 6
                    }
                  }/>
                )
              }
            </Form.Item>
            <Form.Item label='早起时间' {...formItemLayout}>
              {
                getFieldDecorator('time', {
                  initialValue: moment('13:30:56', 'HH:mm:ss')
                })(
                  <TimePicker/>
                )
              }
            </Form.Item>
            <Form.Item label='头像' {...formItemLayout}>
              {
                getFieldDecorator('userImg', {
                  initialValue: true,
                  valuePropName: 'fileList'
                })(
                  <Upload listType='picture-card' showUploadList={false}
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          onChange={this.handleChange}
                  >
                    {
                      this.state.userImg ? <img src={this.state.userImg} alt=""/> : <Icon type='plus'/>
                    }
                  </Upload>
                )
              }
            </Form.Item>
            <Form.Item {...offsetLayout}>
              {
                getFieldDecorator('read', {
                  initialValue: true,
                  valuePropName: 'checked'
                })(
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <Checkbox>我已阅读<a href='#'>慕课协议</a></Checkbox>
                )
              }
            </Form.Item>
            <Form.Item {...offsetLayout}>
              {
                getFieldDecorator('register')(
                  <Button type='primary' onClick={this.handleSubmit}>注册</Button>
                )
              }
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }

  handleChange(info) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          userImg: imageUrl,
          loading: false,
        }),
      );
    }
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleSubmit() {
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err) => {
      if (!err) {
        message.success(`${userInfo.userName} 恭喜您，您通过本次表单注册组件学习，当前密码为：${userInfo.userPwd}` )
      }
    })
  }
}

export default Form.create()(FormRegister);
