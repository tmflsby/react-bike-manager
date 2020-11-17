import React, { Component } from "react";
import { Form, Input, Select, Button, Checkbox, DatePicker } from "antd";
import getOptionList from "../../utils/optionList";

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionList: [
        { id: '0', name: '全部' },
        { id: '1', name: '北京' },
        { id: '2', name: '上海' },
        { id: '3', name: '天津' },
        { id: '4', name: '深圳' }
      ]
    }
  }

  initFormList = () => {
    const { getFieldDecorator } = this.props.form;
    const formList = this.props.formList;
    const formItemList = [];

    if (formList && formList.length > 0) {
      formList.forEach((item) => {
        let label = item.label;
        let field = item.field;
        let initialValue = item.initialValue;
        let placeholder = item.placeholder;
        let width = item.width;

        if (item.type === '时间查询') {
          const DataPicker = (
            <Form.Item label="订单时间" key={field}>
              <Form.Item style={{padding: 0, margin: 0}}>
                {
                  getFieldDecorator('start_time')(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"
                                placeholder="开始时间" style={{width: 170}}
                    />
                  )
                }
              </Form.Item>
              <label style={{margin: "0 10px"}}>~</label>
              <Form.Item style={{padding: 0, margin: 0}}>
                {
                  getFieldDecorator('end_time')(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"
                                placeholder="结束时间" style={{width: 170}}
                    />
                  )
                }
              </Form.Item>
            </Form.Item>
          );

          formItemList.push(DataPicker);
        } else if (item.type === '城市') {
          const City = (
            <Form.Item label="城市" key={field}>
              {
                getFieldDecorator('city', {
                  initialValue: '0'
                })(
                  <Select placeholder={placeholder} style={{width: 80}}>
                    {getOptionList(this.state.optionList)}
                  </Select>
                )
              }
            </Form.Item>
          );

          formItemList.push(City);
        } else if (item.type === 'INPUT') {
          const INPUT = (
            <Form.Item label={label} key={field}>
              {
                getFieldDecorator(field, {
                  initialValue
                })(
                  <Input type="text" style={{width}}
                         placeholder={placeholder}
                  />
                )
              }
            </Form.Item>
          );

          formItemList.push(INPUT);
        } else if (item.type === 'SELECT') {
          const SELECT = (
            <Form.Item label={label} key={field}>
              {
                getFieldDecorator(field, {
                  initialValue
                })(
                  <Select style={{width}} placeholder={placeholder}>
                    {getOptionList(item.list)}
                  </Select>
                )
              }
            </Form.Item>
          );

          formItemList.push(SELECT);
        } else if (item.type === 'CHECKBOX') {
          const CHECKBOX = (
            <Form.Item label={label} key={field}>
              {
                getFieldDecorator(field, {
                  valuePropName: 'checked',
                  initialValue
                })(
                  <Checkbox>{label}</Checkbox>
                )
              }
            </Form.Item>
          );

          formItemList.push(CHECKBOX);
        } else if (item.type === 'DATE') {
          const DATE = (
            <Form.Item label={label} key={field}>
              {
                getFieldDecorator([field])(
                  <DatePicker showTime placeholder={placeholder}
                              format="YYYY-MM-DD HH:mm:ss"
                  />
                )
              }
            </Form.Item>
          );

          formItemList.push(DATE);
        }
      });

      return formItemList;
    }
  }

  handleFilterSubmit = () => {
    this.props.filterSubmit(this.props.form.getFieldsValue());
  }

  reset = () => {
    this.props.form.resetFields();
  }

  render() {
    return (
      <Form layout="inline">
        {this.initFormList()}
        <Form.Item>
          <Button type="primary" style={{margin: "0 20px"}}
                  onClick={this.handleFilterSubmit}
          >
            查询
          </Button>
          <Button onClick={this.reset}>重置</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(FilterForm);
