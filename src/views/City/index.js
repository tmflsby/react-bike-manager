import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import ServiceRequest from "../../serviceRequest";
import pagination  from "../../utils/pagination";
import FilterForm from "./FilterForm";
import OpenCityForm from "./OpenCityForm";
import columns from "./columns";

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isShowOpenCity: false,
    };
    this.params = {
      page: 1
    };
    this.columns = columns;
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    ServiceRequest.axios({
      url: '/open_city',
      method: 'get',
      data: {
        isEasyMock: true,
        params: {
          page: this.params.page
        },
        isShowLoading: true
      }
    }).then(res => {
      res.result.item_list.map((item, index) => {
        item.key = index
        return item
      });
      this.setState({
        dataSource: res.result.item_list,
        pagination: pagination(res, (current) => {
          this.params.page = current;
          this.requestList();
        })
      });
    }).catch(error => {
      console.log(error);
    });
  }

  // 查询城市功能
  handleSearch = (info) => {
    console.log(info);
    ServiceRequest.axios({
      url: '/city/search',
      method: 'get',
      data: {
        isEasyMock: true,
        params: info,
        isShowLoading: true
      }
    }).then(res => {
      if (res.code === 0) {
        message.success(`${res.result}`);
        this.requestList();
      }
    }).catch(error => {
      console.log(error);
    });
  }

  //开通城市弹出框
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    });
  }

  //开通城市表单提交
  handleSubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue();
    console.log(cityInfo);
    ServiceRequest.axios({
      url: '/city/open',
      method: 'get',
      data: {
        isEasyMock: true,
        params: cityInfo,
        isShowLoading: true
      }
    }).then(res => {
      if (res.code === 0) {
        message.success(`${res.result}`);
        this.setState({
          isShowOpenCity: false
        });
        this.requestList();
      }
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Card>
          <FilterForm wrappedComponentRef={(inst) => {this.filterForm = inst}}
                      search={this.handleSearch}
          />
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type="primary" onClick={this.handleOpenCity}>
            开通城市
          </Button>
        </Card>
        <div className="content-wrap">
          <Table bordered columns={this.columns}
                 dataSource={this.state.dataSource}
                 pagination={this.state.pagination}
          />
        </div>
        <Modal title="开通城市" visible={this.state.isShowOpenCity}
               onCancel={() => this.setState({isShowOpenCity: false})}
               onOk={this.handleSubmit}
        >
          <OpenCityForm wrappedComponentRef={(inst) => {this.cityForm = inst}}/>
        </Modal>
      </div>
    );
  }
}

export default City;
