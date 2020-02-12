import React, { Component } from "react";
import { Card, Spin, Icon, Alert } from "antd";
import "./ui.less";

class Loadings extends Component {
  render() {
    const icon = <Icon type='loading' style={{fontSize: 24}}/>;
    return (
      <div>
        <Card title='Spin用法' className='card-wrap'>
          <Spin size='small'/>
          <Spin style={{margin: '0 50px'}}/>
          <Spin size='large'/>
          <Spin indicator={icon} style={{marginLeft: 50}}/>
        </Card>
        <Card title='内容遮罩' className='card-wrap'>
          <Alert message='React' type='error'
                 description='欢迎来到帅🐏单车管理系统'
          />
          <Spin>
            <Alert message='React' type='info'
                   description='欢迎来到帅🐏单车管理系统'
            />
          </Spin>
          <Spin tip='加载中...'>
            <Alert message='React' type='warning'
                   description='欢迎来到帅🐏单车管理系统'
            />
          </Spin>
          <Spin indicator={icon}>
            <Alert message='React' type='success'
                   description='欢迎来到帅🐏单车管理系统'
            />
          </Spin>
        </Card>
      </div>
    );
  }
}

export default Loadings;
