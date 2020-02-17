import React, { Component } from "react";
import "./mock/mockServer";

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
