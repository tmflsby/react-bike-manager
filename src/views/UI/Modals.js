import React, { Component } from "react";
import { Card, Button, Modal } from "antd";
import "./ui.less";

class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal1: false,
      showModal2: false,
      showModal3: false,
      showModal4: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleConfirmModal = this.handleConfirmModal.bind(this);
  }

  handleOpenModal(type) {
    this.setState({
      [type]: true
    });
  }

  handleConfirmModal(type) {
    Modal[type]({
      title: '确认？',
      content: '帅🐏是天底下最帅的🐏吗？',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      }
    })
  }

  render() {
    return (
      <div>
        <Card title='基础模态框' className='card-wrap'>
          <Button type='primary' onClick={() => this.handleOpenModal('showModal1')}>Open</Button>
          <Button type='primary' onClick={() => this.handleOpenModal('showModal2')}>自定义页脚</Button>
          <Button type='primary' onClick={() => this.handleOpenModal('showModal3')}>顶部20px弹框</Button>
          <Button type='primary' onClick={() => this.handleOpenModal('showModal4')}>水平垂直居中</Button>
        </Card><Card title='信息确认框' className='card-wrap'>
        <Button type='primary' onClick={() => this.handleConfirmModal('confirm')}>Confirm</Button>
        <Button type='primary' onClick={() => this.handleConfirmModal('info')}>Info</Button>
        <Button type='primary' onClick={() => this.handleConfirmModal('success')}>Success</Button>
        <Button type='primary' onClick={() => this.handleConfirmModal('warning')}>Warning</Button>
      </Card>
        <Modal title='React' visible={this.state.showModal1}
               onCancel={() => {this.setState({showModal1: false})}}
        >
          <p>欢迎来到 tmflsby 单车管理系统</p>
        </Modal>
        <Modal title='React' visible={this.state.showModal2}
               okText='好的' cancelText='算了'
               onCancel={() => {this.setState({showModal2: false})}}
        >
          <p>欢迎来到 tmflsby 单车管理系统</p>
        </Modal>
        <Modal title='React' visible={this.state.showModal3} style={{top: 20}}
               onCancel={() => {this.setState({showModal3: false})}}
        >
          <p>欢迎来到 tmflsby 单车管理系统</p>
        </Modal>
        <Modal title='React' visible={this.state.showModal4} wrapClassName='vertical-center-modal'
               onCancel={() => {this.setState({showModal4: false})}}
        >
          <p>欢迎来到 tmflsby 单车管理系统</p>
        </Modal>
      </div>
    );
  }
}

export default Modals;
