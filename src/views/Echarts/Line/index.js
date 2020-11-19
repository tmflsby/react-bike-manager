import React, { Component, Fragment } from "react";
import { Card } from "antd";
import echarts from "echarts/lib/echarts";
import ReactEcharts from "echarts-for-react";
import echartsTheme1 from "../echartsTheme1";
import options from "./options";

class Line extends Component {
  constructor(props) {
    super(props);
    this.options = options;
    echarts.registerTheme('Imooc', echartsTheme1);
  }

  render() {
    return (
      <Fragment>
        <Card title="折线图：一">
          <ReactEcharts option={this.options.option1} theme="Imooc" style={{height: 400}}/>
        </Card>
        <Card title="折线图：二" style={{marginTop: 20}}>
          <ReactEcharts option={this.options.option2} theme="Imooc" style={{height: 400}}/>
        </Card>
        <Card title="折线图：三" style={{marginTop: 20}}>
          <ReactEcharts option={this.options.option3} theme="Imooc" style={{height: 400}}/>
        </Card>
        <Card title="折线图：四" style={{marginTop: 20}}>
          <ReactEcharts option={this.options.option4} theme="Imooc" style={{height: 400}}/>
        </Card>
      </Fragment>
    );
  }
}

export default Line;
