import React, { Component } from "react";
import moment from "moment";
import { Row, Col } from "antd";
import axios from "../../axios";
import "./index.less";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '帅🐏'
    };
    this.timer = setInterval(() => {
      let sysTime = moment().format('MMMM Do YYYY, h:mm:ss a');
      this.setState({
        sysTime
      });
    }, 1000);
    this.getWeatherAPIData();
    this.getWeatherAPIData = this.getWeatherAPIData.bind(this);
  }

  render() {
    return (
      <div className='header'>
        <Row className="header-top">
          <Col span={24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#/admin/home">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">首页</Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-detail">{this.state.currentCity}</span>
            <span className="weather-img">
              <img src={this.state.dayPictureUrl} alt=""/>
            </span>
            <span className="weather-detail">{this.state.weather}</span>
          </Col>
        </Row>
      </div>
    );
  }

  getWeatherAPIData() {
    let city = '武穴';
    console.log('use jsonp')
    axios.jsonp({
      url: `http://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(city)}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    }).then(res => {
      let currentCity = res.results[0].currentCity;
      let data = res.results[0].weather_data[0];
      this.setState({
        currentCity: currentCity,
        dayPictureUrl: data.dayPictureUrl,
        weather: data.weather
      })
    }).catch(err => {
      console.log(err);
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
}

export default Header;
