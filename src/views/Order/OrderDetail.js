import React, { Component } from "react";
import { Card } from "antd";
import ServiceRequest from "../../serviceRequest";
import "./detail.less";

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let params = this.props.match.params
    console.log(params);
    if (params.orderId) {
      this.getDetailInfo(params.orderId)
    }
  }

  getDetailInfo = (orderId) => {
    ServiceRequest.axios({
      url: '/order/detail',
      method: 'get',
      data: {
        isEasyMock: true,
        params: {
          orderId
        },
        isShowLoading: true
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          orderInfo: res.result
        });
        this.renderMap(res.result);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  renderMap = (result) => {
    this.map = new window.AMap.Map('orderDetailMap');

    window.AMap.plugin([
      'AMap.ToolBar',
      'AMap.Scale',
      'AMap.MapType',
      'AMap.Geolocation',
    ], () => {
      // 调用添加地图控件方法
      this.addMapControl();

      // 调用路线图绘制方法
      this.drawBikeRoute(result.position_list);

      // 调用服务区绘制方法
      this.drawServiceArea(result.area);
    })
  }

  addMapControl = () => {
    // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
    this.map.addControl(new window.AMap.ToolBar({
      position: {top: '10px', left: '10px'}
    }));

    // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
    this.map.addControl(new window.AMap.Geolocation({
      position: {top: '80px', left: '10px'}
    }));

    // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
    this.map.addControl(new window.AMap.Scale({
      position: {bottom: '10px', right: '10px'}
    }));

    // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    this.map.addControl(new window.AMap.MapType({
      position: {top: '10px', right: '10px'}
    }));
  }

  drawBikeRoute = (position_list) => {
    if (position_list.length > 0) {
      // 绘制起点坐标icon
      let start = position_list[0];
      let startPoint = new window.AMap.LngLat(start.lon, start.lat);
      let startPointIcon = new window.AMap.Icon({
        image: '/assets/start_point.png',
        imageSize: new window.AMap.Size(36, 42),
        size: new window.AMap.Size(36, 42)
      });
      let startMarker = new window.AMap.Marker({
        position: startPoint,
        icon: startPointIcon,
        anchor:'bottom-center'
      });
      this.map.add(startMarker);

      // 绘制终点坐标icon
      let end = position_list[position_list.length - 1];
      let endPoint = new window.AMap.LngLat(end.lon, end.lat);
      let endPointIcon = new window.AMap.Icon({
        image: '/assets/end_point.png',
        imageSize: new window.AMap.Size(36, 42),
        size: new window.AMap.Size(36, 42)
      });
      let endMarker = new window.AMap.Marker({
        position: endPoint,
        icon: endPointIcon,
        anchor:'bottom-center'
      });
      this.map.add(endMarker);

      // 绘制行驶路线
      let trackPoint = [];
      for (let i = 0; i < position_list.length; i++) {
        let point = position_list[i];
        trackPoint.push(new window.AMap.LngLat(point.lon, point.lat));
      }
      let polyline = new window.AMap.Polyline({
        path: trackPoint,
        strokeWeight: 4, // 线条宽度，默认为 1
        strokeColor: '#000', // 线条颜色
        strokeOpacity: 1,
        lineJoin: 'round' // 折线拐点连接处样式
      });
      this.map.add(polyline);

      // 设置地图中心点和缩放级别
      this.map.setZoomAndCenter(10, endPoint);
    }
  }

  drawServiceArea = (area) => {
    // 绘制服务区
    let trackPoint = [];
    for (let i = 0; i < area.length; i++) {
      let point = area[i];
      trackPoint.push(new window.AMap.LngLat(point.lon, point.lat));
    }
    let polyline = new window.AMap.Polyline({
      path: trackPoint,
      strokeWeight: 3, // 线条宽度，默认为 1
      strokeColor: '#ef4136', // 线条颜色
      strokeOpacity: 1,
      lineJoin: 'round' // 折线拐点连接处样式
    });
    this.map.add(polyline);
  }

  render() {
    const apiInfo = this.state.orderInfo || {};
    const urlInfo = this.props.match.params;

    return (
      <div>
        <Card>
          <div id="orderDetailMap" className="order-map"></div>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">{apiInfo.mode === 1 ? '服务区' : '停车点'}</div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{urlInfo.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{apiInfo.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{urlInfo.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{apiInfo.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行程起点</div>
                <div className="detail-form-content">{apiInfo.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程终点</div>
                <div className="detail-form-content">{apiInfo.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">{apiInfo.distance / 1000}公里</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}

export default OrderDetail;
