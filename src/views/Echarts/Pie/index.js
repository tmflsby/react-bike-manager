import React, { Component, Fragment } from "react";
import { Card } from "antd";
import echarts from "echarts/lib/echarts";
import ReactEcharts from "echarts-for-react";
import echartsTheme3 from "../echartsTheme3";

class Pie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option1: {
        title: {
          text: '用户骑行菜单',
          x: 'center'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',]
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}: {c}({d}%)'
        },
        series: [
          {
            name: '订单量',
            type: 'pie',
            data: [
              {
                value: 1000,
                name: '周一'
              },
              {
                value: 8542,
                name: '周二'
              },
              {
                value: 2654,
                name: '周三'
              },
              {
                value: 7895,
                name: '周四'
              },
              {
                value: 7569,
                name: '周五'
              },
              {
                value: 8976,
                name: '周六'
              },
              {
                value: 2100,
                name: '周日'
              },
            ]
          }
        ]
      },
      option2: {
        title: {
          text: '用户骑行菜单',
          x: 'center'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',]
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}: {c}({d}%)'
        },
        series: [
          {
            name: '订单量',
            type: 'pie',
            radius: ['50%', '80%'],
            data: [
              {
                value: 1000,
                name: '周一'
              },
              {
                value: 8542,
                name: '周二'
              },
              {
                value: 2654,
                name: '周三'
              },
              {
                value: 7895,
                name: '周四'
              },
              {
                value: 7569,
                name: '周五'
              },
              {
                value: 8976,
                name: '周六'
              },
              {
                value: 2100,
                name: '周日'
              },
            ]
          }
        ]
      },
      option3: {
        title: {
          text: '用户骑行菜单',
          x: 'center'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',]
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}: {c}({d}%)'
        },
        series: [
          {
            name: '订单量',
            type: 'pie',

            data: [
              {
                value: 4500,
                name: '周一'
              },
              {
                value: 8542,
                name: '周二'
              },
              {
                value: 6954,
                name: '周三'
              },
              {
                value: 7895,
                name: '周四'
              },
              {
                value: 7569,
                name: '周五'
              },
              {
                value: 8976,
                name: '周六'
              },
              {
                value: 5600,
                name: '周日'
              },
            ].sort((a, b) => {
              return a.value - b.value
            }),
            roseType: 'radius'
          }
        ]
      }
    };
    echarts.registerTheme('Imooc', echartsTheme3);
  }

  render() {
    return (
      <Fragment>
        <Card title="饼状图：一">
          <ReactEcharts option={this.state.option1} theme="Imooc" style={{ height: 500 }}/>
        </Card>
        <Card title="饼状图：二" style={{margin: "20px 0"}}>
          <ReactEcharts option={this.state.option2} theme="Imooc" style={{ height: 500 }}/>
        </Card>
        <Card title="饼状图：三">
          <ReactEcharts option={this.state.option3} theme="Imooc" style={{ height: 500 }}/>
        </Card>
      </Fragment>
    );
  }

}

export default Pie;
