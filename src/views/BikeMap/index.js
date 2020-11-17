import React, { Component, Fragment } from "react";
import { Card } from "antd";
import FilterForm from "../../components/FilterForm";
import ServiceRequest from "../../serviceRequest";

class BikeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_count: 0
    };
    this.map = '';
    this.bikeMapFormList = [
      {
        type: '城市',
        field:'city'
      }, {
        type: '时间查询',
        field:'search_time'
      }, {
        type: 'SELECT',
        label: '订单状态',
        field: 'order_status',
        placeholder: '全部',
        initialValue: '0',
        list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '行程结束' }],
        width: 100
      }
    ];
  }

  componentDidMount() {
    this.requestList();
  }

  renderMap = (res) => {
    // 初始化高德地图
    this.map = new window.AMap.Map('container');

    window.AMap.plugin([
      'AMap.ToolBar',
      'AMap.Scale',
      'AMap.MapType',
      'AMap.Geolocation',
    ], () => {
      // 调用添加地图控件方法
      this.addMapControl();

      // 调用路线图绘制方法
      this.drawBikeRoute(res.route_list);

      // 调用服务区绘制方法
      this.drawServiceArea(res.service_list);

      // 调用车辆图标绘制方法
      this.drawBikeIcon(res.bike_list);
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

  drawBikeRoute = (route_list) => {
    if (route_list.length > 0) {
      // 绘制起点坐标icon
      let startPointArray = route_list[0].split(',');
      let startPoint = new window.AMap.LngLat(startPointArray[0], startPointArray[1]);
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
      let endPointArray = route_list[route_list.length - 1].split(',');
      let endPoint = new window.AMap.LngLat(endPointArray[0], endPointArray[1]);
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
      for (let i = 0; i < route_list.length; i++) {
        let pointArray = route_list[i].split(',');
        trackPoint.push(new window.AMap.LngLat(pointArray[0], pointArray[1]));
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

  drawServiceArea = (service_list) => {
    // 绘制服务区
    let trackPoint = [];
    for (let i = 0; i < service_list.length; i++) {
      let point = service_list[i];
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

  drawBikeIcon = (bike_list) => {
    // 添加自行车图标
    let bikePointIcon = new window.AMap.Icon({
      image: '/assets/bike.jpg',
      imageSize: new window.AMap.Size(36, 42),
      size: new window.AMap.Size(36, 42)
    });

    bike_list.forEach(item => {
      let pointArray = item.split(',');
      let point = new window.AMap.LngLat(pointArray[0], pointArray[1]);
      let bikeMarker = new window.AMap.Marker({
        position: point,
        icon: bikePointIcon,
        anchor:'bottom-center'
      });
      this.map.add(bikeMarker);
    });
  }

  requestList = () => {
    ServiceRequest.axios({
      url: '/map/bike_list',
      method: 'get',
      data: {
        isEasyMock: true,
        params: this.params,
        isShowLoading: true
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          total_count: res.result.total_count
        });
        this.renderMap(res.result);
      }
    }).catch(error => {
      console.log(error);
    })
  }

  handleFilter = (params) => {
    this.params = params;
    this.requestList();
  }

  render() {
    return (
      <Fragment>
        <Card>
          <FilterForm formList={this.bikeMapFormList} filterSubmit={this.handleFilter}/>
        </Card>
        <Card style={{marginTop: 10}}>
          <div>共{this.state.total_count}辆车</div>
          <div id="container" style={{height: 500}}/>
        </Card>
      </Fragment>
    );
  }
}

export default BikeMap;
