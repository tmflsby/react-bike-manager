import React, {Component} from "react";
import {Button, Form, Select} from "antd";

/**查询筛选表单*/
class FilterForm extends Component {
  handleReset = () => {
    this.props.form.resetFields()
  }

  handleSearchClick = () => {
    this.props.search(this.props.form.getFieldsValue())
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <Form.Item label="城市">
          {
            getFieldDecorator('city_id')(
              <Select placeholder="全部" style={{width: 100}}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">北京市</Select.Option>
                <Select.Option value="2">天津市</Select.Option>
                <Select.Option value="3">深圳市</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="用车模式">
          {
            getFieldDecorator('mode')(
              <Select placeholder="全部" style={{width: 125}}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">指定停车点模式</Select.Option>
                <Select.Option value="2">禁停区模式</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="运营模式">
          {
            getFieldDecorator('op_mode')(
              <Select placeholder="全部" style={{width: 80}}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">自营</Select.Option>
                <Select.Option value="2">加盟</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="加盟商授权状态">
          {
            getFieldDecorator('auth_status')(
              <Select placeholder="全部" style={{width: 100}}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">已授权</Select.Option>
                <Select.Option value="2">未授权</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{margin: '0 20px'}}
                  onClick={this.handleSearchClick}
          >
            查询
          </Button>
          <Button onClick={this.handleReset}>重置</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(FilterForm);
