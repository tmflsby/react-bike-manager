import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Main from "./Main";
import About from "../router1/About";
import Topics from "../router1/Topics";
import Home from "./Home";

class IRouter extends Component {
  render() {
    return (
      <Router>
        <Home>
          <Route path='/main' render={() =>
            <Main>
              <Route path='/main/a' component={About}/>
            </Main>
          }/>
          <Route path='/about' component={About}/>
          <Route path='/topics' component={Topics}/>
        </Home>
      </Router>
    );
  }
}

export default IRouter;
