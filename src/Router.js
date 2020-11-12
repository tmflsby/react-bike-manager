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

class Router extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Route path='/login' component={Login}/>
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
                <Route component={NoMatch}/>
              </Switch>
            </Admin>
          }/>
          <Route path='/order/detail' component={Login}/>
        </App>
      </HashRouter>
    )
  }
}

export default Router;
