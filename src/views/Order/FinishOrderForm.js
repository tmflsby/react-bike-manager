//结束订单子组件
import React, {Component} from "react";
import {Form} from "antd";

class FinishOrderForm extends Component {
  render() {
    const { bike_sn, battery, start_time, location } = this.props;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    return (
      <Form layout="horizontal">
        <Form.Item {...formItemLayout} label="车辆编号">
          {bike_sn}
        </Form.Item>
        <Form.Item {...formItemLayout} label="剩余电量">
          {battery + '%'}
        </Form.Item>
        <Form.Item {...formItemLayout} label="行程开始时间">
          {start_time}
        </Form.Item>
        <Form.Item {...formItemLayout} label="当前位置">
          {location}
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(FinishOrderForm);
