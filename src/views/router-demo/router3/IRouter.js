import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./Main";
import About from "../router1/About";
import Topics from "../router1/Topics";
import Home from "./Home";
import Info from "./Info";
import NoMatch from "./NoMatch";

class IRouter extends Component {
  render() {
    return (
      <Router>
        <Home>
          <Switch>
            <Route path='/main' render={() =>
              <Main>
                <Route path='/main/:value' component={Info}/>
              </Main>
            }/>
            <Route path='/about' component={About}/>
            <Route path='/topics' component={Topics}/>
            <Route component={NoMatch}/>
          </Switch>
        </Home>
      </Router>
    );
  }
}

export default IRouter;
