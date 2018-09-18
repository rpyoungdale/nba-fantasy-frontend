import React, { Component } from "react";
import "./App.css";
import UserHome from "./Containers/UserHome";
import NavBar from "./Components/NavBar";

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
        <NavBar />
        <UserHome />
      </div>
    );
  }
}

export default App;
