import React from "react";
import NavBar from "../Components/NavBar";
import PlayerProfile from "../Components/PlayerProfile";
import GameScores from "./GameScores";
import Roster from "./Roster";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

class LoggedIn extends React.Component {
  constructor() {
    super();

    this.state = {
      playerProfile: false,
      searchedPlayer: {}
    };
  }

  displayPlayerInfo = searchedPlayer => {
    this.setState({
      searchedPlayer: searchedPlayer,
      playerProfile: true
    });
  };

  // viewScores = () => {
  //   debugger;
  //   this.setState({
  //     playerProfile: false
  //   });
  // };

  render() {
    console.log(this.state);
    return (
      <BrowserRouter>
        <div>
          <NavBar
            displayPlayerInfo={this.displayPlayerInfo}
            loggedIn={this.props.loggedIn}
            currentUser={this.props.currentUser}
            handleLogOut={this.props.handleLogOut}
            viewScores={this.viewScores}
          />
          {this.state.playerProfile ? (
            <PlayerProfile
              searchedPlayer={this.state.searchedPlayer}
              allTeams={this.props.allTeams}
            />
          ) : (
            <div>
              <Route exact path="/roster" render={() => <Roster />} />
              <Route exact path="/scores" render={() => <GameScores />} />
            </div>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default LoggedIn;
