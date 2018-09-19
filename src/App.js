import React, { Component } from "react";
import "./App.css";
import UserHome from "./Containers/UserHome";
import NavBar from "./Components/NavBar";

const baseURL = "http://localhost:3000";

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
        <NavBar findPlayer={this.findPlayer} />
        <UserHome />
      </div>
    );
  }
}

export default App;
