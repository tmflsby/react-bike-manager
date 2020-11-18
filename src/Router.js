import React, { Component } from "react";
import { HashRouter , Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./views/Login";
import Admin from "./Admin";
import Buttons from "./views/UI/Buttons";
import NoMatch from "./views/NoMatch";
import Home from "./views/Home";
import Modals from "./views/UI/Modals";
import Loadings from "./views/UI/Loadings";
import Notifications from "./views/UI/Notifications";
import Messages from "./views/UI/Messages";
import Tabs from "./views/UI/Tabs";
import Galleries from "./views/UI/Galleries";
import Carousels from "./views/UI/Carousels";
import FormLogin from "./views/Form/FormLogin";
import FormRegister from "./views/Form/FormRegister";
import BasicTable from "./views/Table/BasicTable";
import HighTable from "./views/Table/HighTable";
import RichText from "./views/RichText";
import City from "./views/City";
import BikeMap from "./views/BikeMap";
import Line from "./views/Echarts/Line";
import Bar from "./views/Echarts/Bar";
import Pie from "./views/Echarts/Pie";
import Order from "./views/Order";
import Common from "./Common";
import OrderDetail from "./views/Order/OrderDetail";
import Staff from "./views/Staff";
import Permission from "./views/Permission";

class Router extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path='/common' render={() => (
              <Common>
                <Route path='/common/order/detail/:orderId/:user_name/:order_sn' component={OrderDetail} />
              </Common>
            )}/>
            <Route path='/' render={() =>
              <Admin>
                <Switch>
                  <Route path='/home' component={Home}/>
                  <Route path='/ui/buttons' component={Buttons}/>
                  <Route path='/ui/modals' component={Modals}/>
                  <Route path='/ui/loadings' component={Loadings}/>
                  <Route path='/ui/notification' component={Notifications}/>
                  <Route path='/ui/messages' component={Messages}/>
                  <Route path='/ui/Tabs' component={Tabs}/>
                  <Route path='/ui/gallery' component={Galleries}/>
                  <Route path='/ui/carousel' component={Carousels}/>
                  <Route path='/form/login' component={FormLogin}/>
                  <Route path='/form/reg' component={FormRegister}/>
                  <Route path='/table/basic' component={BasicTable}/>
                  <Route path='/table/high' component={HighTable}/>
                  <Route path='/rich' component={RichText}/>
                  <Route path='/city' component={City}/>
                  <Route path='/bikeMap' component={BikeMap}/>
                  <Route path='/charts/line' component={Line}/>
                  <Route path='/charts/bar' component={Bar}/>
                  <Route path='/charts/pie' component={Pie}/>
                  <Route path='/order' component={Order}/>
                  <Route path='/staff' component={Staff}/>
                  <Route path='/permission' component={Permission}/>
                  <Route component={NoMatch}/>
                </Switch>
              </Admin>
            }/>
            <Route path='/login' component={Login}/>
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

export default Router;
