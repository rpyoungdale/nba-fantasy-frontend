import React, { Component } from "react";
import "./App.css";
import UserHome from "./Containers/UserHome";

class App extends Component {
  constructor() {
    super();

    this.state = {
      teams: []
    };
  }

  render() {
    return (
      <div>
        <UserHome />
      </div>
    );
  }
}

export default App;
