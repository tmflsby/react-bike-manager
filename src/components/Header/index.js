import React, { Component } from "react";
import moment from "moment";
import { Row, Col } from "antd";
import ServiceRequest from "../../serviceRequest";
import "./index.less";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '帅🐏'
    };
    this.timer = setInterval(() => {
      let systemTime = moment().format('YYYY-MM-DD, hh:mm:ss');
      this.setState({
        systemTime
      });
    }, 20);
    this.getWeatherAPIData();
    this.getWeatherAPIData = this.getWeatherAPIData.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getWeatherAPIData() {
    let city = '武穴';
    console.log('use jsonp')
    ServiceRequest.jsonp({
      url: `http://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(city)}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    }).then(res => {
      let currentCity = res.results[0].currentCity;
      let data = res.results[0].weather_data[0];
      this.setState({
        currentCity: currentCity,
        dayPictureUrl: data.dayPictureUrl,
        nightPictureUrl: data.nightPictureUrl,
        temperature: data.temperature,
        weather: data.weather,
        wind: data.wind
      })
    }).catch(err => {
      console.log(err);
    })
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
            <span className="date">{this.state.systemTime}</span>
            <span className="weather-detail">{this.state.currentCity}</span>
            <span className="weather-img">
              {
                (new Date().getHours() > 6 && new Date().getHours() < 18) ?
                  <img src={this.state.dayPictureUrl} alt=""/> :
                  <img src={this.state.nightPictureUrl} alt=""/>
              }
            </span>
            <span className="weather-detail">
              {this.state.weather} {this.state.wind} {this.state.temperature}
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
