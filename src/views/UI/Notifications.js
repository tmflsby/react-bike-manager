import React, { Component } from "react";
import {Card, Button, notification } from "antd";
import "./ui.less";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.handleOpenNotification = this.handleOpenNotification.bind(this);
  }

  render() {
    return (
      <div>
        <Card title='通知提醒框' className='card-wrap'>
          <Button type='primary' onClick={() => this.handleOpenNotification('success')}>Success</Button>
          <Button type='primary' onClick={() => this.handleOpenNotification('info')}>Info</Button>
          <Button type='primary' onClick={() => this.handleOpenNotification('warning')}>Warning</Button>
          <Button type='primary' onClick={() => this.handleOpenNotification('error')}>Error</Button>
        </Card>
        <Card title='通知提醒框' className='card-wrap'>
          <Button type='primary' onClick={() => this.handleOpenNotification('success', 'topLeft')}>Success</Button>
          <Button type='primary' onClick={() => this.handleOpenNotification('info', 'topRight')}>Info</Button>
          <Button type='primary' onClick={() => this.handleOpenNotification('warning', 'bottomLeft')}>Warning</Button>
          <Button type='primary' onClick={() => this.handleOpenNotification('error', 'bottomRight')}>Error</Button>
        </Card>
      </div>
    );
  }

  handleOpenNotification(type, direction) {
    if (direction) {
      notification.config({
        placement: direction
      });
    }
    notification[type]({
      message: '发工资了',
      description: '上个月考勤22天，迟到2天，扣工资250元，实发工资一个亿'
    });
  }
}

export default Notifications;
