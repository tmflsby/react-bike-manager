import React, { Component } from "react";
import { HashRouter , Route, Switch, Redirect } from "react-router-dom";
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

class Router extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path='/'>
              <Redirect to='/admin/home'/>
              <Route path='/admin' render={() =>
                <Admin>
                  <Switch>
                    <Route path='/admin/home' component={Home}/>
                    <Route path='/admin/ui/buttons' component={Buttons}/>
                    <Route path='/admin/ui/modals' component={Modals}/>
                    <Route path='/admin/ui/loadings' component={Loadings}/>
                    <Route path='/admin/ui/notification' component={Notifications}/>
                    <Route path='/admin/ui/messages' component={Messages}/>
                    <Route path='/admin/ui/Tabs' component={Tabs}/>
                    <Route path='/admin/ui/gallery' component={Galleries}/>
                    <Route path='/admin/ui/carousel' component={Carousels}/>
                    <Route path='/admin/form/login' component={FormLogin}/>
                    <Route path='/admin/form/reg' component={FormRegister}/>
                    <Route path='/admin/table/basic' component={BasicTable}/>
                    <Route path='/admin/table/high' component={HighTable}/>
                    <Route path='/admin/rich' component={RichText}/>
                    <Route path='/admin/city' component={City}/>
                    <Route path='/admin/bikeMap' component={BikeMap}/>
                    <Route path='/admin/charts/line' component={Line}/>
                    <Route path='/admin/charts/bar' component={Bar}/>
                    <Route path='/admin/charts/pie' component={Pie}/>
                    <Route path='/admin/order' component={Order}/>
                    <Route component={NoMatch}/>
                  </Switch>
                </Admin>
              }/>
            </Route>
            <Route path='/common' render={() => (
              <Common>
                <Route path='/common/order/detail/:orderId/:user_name/:order_sn' component={OrderDetail} />
              </Common>
            )}/>
            <Route path='/login' component={Login}/>
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

export default Router;
