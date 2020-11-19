import React, {Component} from "react";
import {Form, Radio, Select} from "antd";

/**开通城市表单*/
class OpenCityForm extends Component {
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal">
        <Form.Item label="选择城市" {...formItemLayout}>
          {
            getFieldDecorator('city_id', {
              initialValue: '1'
            })(
              <Select style={{width: 100}}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">北京市</Select.Option>
                <Select.Option value="2">天津市</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="运营模式" {...formItemLayout}>
          {
            getFieldDecorator('op_mode', {
              initialValue: '1'
            })(
              <Radio.Group style={{width: 200}}>
                <Radio value="1">自营</Radio>
                <Radio value="2">加盟</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
        <Form.Item label="用车模式" {...formItemLayout}>
          {
            getFieldDecorator('use_mode', {
              initialValue: '1'
            })(
              <Radio.Group style={{width: 200}}>
                <Radio value="1">指定停车点</Radio>
                <Radio value="2">禁停区</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(OpenCityForm);
