import React, { Component } from "react";
import { HashRouter , Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./views/Login";
import Admin from "./Admin";
import Button from "./views/UI/Button";
import NoMatch from "./views/NoMatch";
import Home from "./views/Home";

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
                <Route path='/admin/ui/buttons' component={Button}/>
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
