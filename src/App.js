import React, { Component } from "react";
import "./App.css";
import UserHome from "./Containers/UserHome";
import NavBar from "./Components/NavBar";
import PlayerProfile from "./Components/PlayerProfile";

const baseURL = "http://localhost:3000";

class App extends Component {
  constructor() {
    super();

    this.state = {
      allTeams: [],
      playerProfile: false,
      searchedPlayer: {}
    };
  }

  componentDidMount() {
    fetch(`${baseURL}/all-teams`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          allTeams: json.league.vegas
        });
      });
  }

  displayPlayerInfo = searchedPlayer => {
    this.setState({
      searchedPlayer: searchedPlayer,
      playerProfile: true
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <NavBar displayPlayerInfo={this.displayPlayerInfo} />
        {this.state.playerProfile ? (
          <PlayerProfile
            searchedPlayer={this.state.searchedPlayer}
            allTeams={this.state.allTeams}
          />
        ) : (
          <UserHome allTeams={this.state.allTeams} />
        )}
      </div>
    );
  }
}

export default App;
