import React, { Component, Fragment } from "react";
import { Card } from "antd";
import echarts from "echarts/lib/echarts";
import ReactEcharts from "echarts-for-react";
import echartsTheme3 from "../echartsTheme3";
import options from "./options";

class Pie extends Component {
  constructor(props) {
    super(props);
    this.options = options;
    echarts.registerTheme('Imooc', echartsTheme3);
  }

  render() {
    return (
      <Fragment>
        <Card title="饼状图：一">
          <ReactEcharts option={this.options.option1} theme="Imooc" style={{ height: 500 }}/>
        </Card>
        <Card title="饼状图：二" style={{margin: "20px 0"}}>
          <ReactEcharts option={this.options.option2} theme="Imooc" style={{ height: 500 }}/>
        </Card>
        <Card title="饼状图：三">
          <ReactEcharts option={this.options.option3} theme="Imooc" style={{ height: 500 }}/>
        </Card>
      </Fragment>
    );
  }

}

export default Pie;
