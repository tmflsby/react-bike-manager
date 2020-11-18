import React, { Component } from "react";
import { Row, Col, Modal } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { handleLogout } from "../../store/actionCreator";
import ServiceRequest from "../../serviceRequest";
import menuList from "../../config/menuConfig";
import "./index.less";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '帅🐏',
      currentKey: window.location.hash.replace(/#|\?.*$/g, ''),
      title: ''
    };
    setInterval(() => {
      let systemTime = moment().format('YYYY-MM-DD, HH:mm:ss');
      this.setState({
        systemTime
      });
    }, 20);
  }

  componentDidMount() {
    this.checkTitle(menuList);
    this.getWeatherAPIData();
  }

  checkTitle = (menus) => {
    menus.forEach(item => {
      if (item.children) {
        this.checkTitle(item.children);
      }
      if (item.key === this.state.currentKey) {
        this.setState({
          title: item.title
        });
      }
    });
  }

  getWeatherAPIData() {
    let city = '武穴';
    // baiduAPI
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

  // 退出登陆
  handleLogout = (type) => {
    const { dispatch } = this.props;

    Modal[type]({
      title: '确认？',
      content: '你确定要退出账号吗？',
      onOk() {
        localStorage.removeItem('token');
        dispatch(handleLogout(localStorage.getItem('token')));
        window.location.href = window.location.origin + `/#/login`;
        console.log(window.location)
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  render() {
    const menuType = this.props.menuType;
    // const menuName = this.props.menuName;
    const urlMenuName = this.props.urlMenuName;

    return (
      <div className='header'>
        <Modal title='React'
               visible={this.state.showLogoutModal}
               onCancel={() => {
                 this.setState({
                   showLogoutModal: false
                 });
               }}>
          <p>确认要退出账号吗?</p>
        </Modal>
        <Row className="header-top">
          {
            menuType ? (
              <Col span={6} className='logo'>
                <img src='/assets/logo-ant.svg' alt=''/>
                <span>IMOOC 通用管理系统 </span>
              </Col>
            ) : ''
          }
          <Col span={menuType ? 18 : 24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#/home" onClick={() => {this.handleLogout('confirm')}}>
              退出
            </a>
          </Col>
        </Row>
        {
          menuType ? '' : (
            <Row className='breadcrumb'>
              <Col span={4} className='breadcrumb-title'>
                {urlMenuName ? urlMenuName : this.state.title}
              </Col>
              <Col span={20} className='weather'>
                <span className='date'>{this.state.systemTime}</span>
                <span className='weather-detail'>{this.state.currentCity}</span>
                <span className="weather-img">
                  {
                    (new Date().getHours() > 6 && new Date().getHours() < 18) ?
                      <img width={55} src={this.state.dayPictureUrl} alt=""/> :
                      <img width={55} src={this.state.nightPictureUrl} alt=""/>
                  }
                </span>
                <span className="weather-detail">
                  {this.state.weather} {this.state.wind} {this.state.temperature}
                </span>
              </Col>
            </Row>
          )
        }
      </div>
    );
  }
}

const mapState = (state) => ({
  menuName: state.menuName,
  urlMenuName : state.url
})

export default connect(mapState, null)(Header);
