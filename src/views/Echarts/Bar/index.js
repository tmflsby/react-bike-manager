import React, { Component, Fragment } from "react";
import { Card } from "antd";
import echarts from "echarts/lib/echarts";
import ReactEcharts from "echarts-for-react";
import echartsTheme2 from "../echartsTheme2";
import options from "./options";

class Bar extends Component {
  constructor(props) {
    super(props);
    this.options = options
    echarts.registerTheme('Imooc', echartsTheme2);
  }

  render() {
    return (
      <Fragment>
        <Card title="柱状图：一">
          <ReactEcharts option={this.options.option1} theme="Imooc" style={{height: 600}}/>
        </Card>
        <Card title="柱状图：二" style={{marginTop: 20}}>
          <ReactEcharts option={this.options.option2} theme="Imooc" style={{height: 600}}/>
        </Card>
      </Fragment>
    );
  }
}

export default Bar;
