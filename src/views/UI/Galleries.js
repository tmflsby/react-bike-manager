import React, { Component } from "react";
import { Card, Row, Col, Modal, Tabs } from "antd";
import "./ui.less";

class Galleries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.openGallery = this.openGallery.bind(this);
    this.openGallery2 = this.openGallery2.bind(this);
    this.callback = this.callback.bind(this);
  }

  render() {
    const imgs = [
      ['1.png', '2.png', '3.png', '4.png', '5.png'],
      ['6.png', '7.png', '8.png', '9.png', '10.png'],
      ['11.png', '12.png', '13.png', '14.png', '15.png'],
      ['16.png', '17.png', '18.png', '19.png', '20.png'],
      ['21.png', '22.png', '23.png', '24.png', '25.png']
    ];

    //图片组一
    const imgList = imgs.map((list) => list.map((item, index) =>
      <Card
        cover={<img src={'/gallery/' + item} alt='' />}
        style={{ marginBottom: 10 }} key={index}
        onClick={() => this.openGallery(item)}
      >
        <Card.Meta title='React' description='I love mooc'/>
      </Card>
    ));

    //图片组二
    const imgList2 = imgs.map((list) => list.map((item, index) =>
      <Card
        cover={<img src={'/gallery2/' + item} alt='' />}
        style={{ marginBottom: 10 }} key={index}
        onClick={() => this.openGallery2(item)}
      >
        <Card.Meta title='邓紫棋' description='My Love'/>
      </Card>
    ));

    return (
      <Card className='card-wrap'>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <Tabs.TabPane tab="React 画廊" key="1">
            <Row gutter={10}>
              <Col md={5}>{imgList[0]}</Col>
              <Col md={5}>{imgList[1]}</Col>
              <Col md={5}>{imgList[2]}</Col>
              <Col md={5}>{imgList[3]}</Col>
              <Col md={4}>{imgList[4]}</Col>
            </Row>
            <Modal title={'图片画廊'} width={400} height={200}
              visible={this.state.visible} footer={null}
              onCancel={() => this.setState({ visible: false })}
            >
              <img src={this.state.currentImg} alt="" style={{ width: '100%' }} />
            </Modal>
          </Tabs.TabPane>

          <Tabs.TabPane tab="邓紫棋" key="2">
            <Row gutter={15}>
              <Col md={4}>{imgList2[0]}</Col>
              <Col md={5}>{imgList2[1]}</Col>
              <Col md={6}>{imgList2[2]}</Col>
              <Col md={5}>{imgList2[3]}</Col>
              <Col md={4}>{imgList2[4]}</Col>
            </Row>
            <Modal title={'图片画廊'} width={400} height={200}
              visible={this.state.visible} footer={null}
              onCancel={() => this.setState({ visible: false })}
            >
              <img src={this.state.currentImg} alt="" style={{ width: '100%' }} />
            </Modal>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  }

  openGallery(currentImg) {
    this.setState({
      currentImg: '/gallery/' + currentImg,
      visible: true
    });
  }

  openGallery2(currentImg) {
    this.setState({
      currentImg: '/gallery2/' + currentImg,
      visible: true
    })
  }

  callback(key) {
    console.log(key);
  }
}

export default Galleries;
