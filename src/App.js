import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import UserHome from "./Containers/UserHome";
import LoggedIn from "./Containers/LoggedIn";
import NotLoggedIn from "./Containers/NotLoggedIn";
import NavBar from "./Components/NavBar";
import PlayerProfile from "./Components/PlayerProfile";
import GameScores from "./Containers/GameScores";
import Roster from "./Containers/Roster";
import Login from "./Containers/Login";
import SockJS from "sockjs-client";

const baseURL = "http://localhost:3000";

class App extends Component {
  constructor() {
    super();

    // var sock = new SockJS(baseURL);
    // sock.onopen = function() {
    //   console.log("open");
    //   // sock.send("test");
    // };
    //
    // sock.onmessage = function(e) {
    //   console.log("message", e.data);
    //   sock.close();
    // };
    //
    // sock.onclose = function() {
    //   console.log("close");
    // };

    fetch(`${baseURL}/all-teams`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          allTeams: json.league.vegas
        });
      });

    if (localStorage.getItem("token")) {
      // debugger;
      fetch(`${baseURL}/user`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(res => res.json())
        .then(json =>
          this.setState({
            currentUser: json,
            loggedIn: true
          })
        );
    }

    this.state = {
      loggedIn: false,
      currentUser: {},
      allTeams: [],
      searchedPlayer: {}
    };
  }

  componentDidMount() {}

  changeToLoggedIn = json => {
    this.setState({
      currentUser: json,
      loggedIn: true
    });
  };

  setUser = () => {
    // debugger;
    fetch(`${baseURL}/user`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(json => this.changeToLoggedIn(json));
  };

  // setUser = () => {
  //   // debugger;
  //   fetch(`${baseURL}/user`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  // this.setState({
  //   currentUser: json,
  //   loggedIn: true,
  //   signIn: false,
  //   signUp: false
  // });
  //     });
  // };

  // handleSignIn = () => {
  //   this.setState({
  //     signIn: true,
  //     signUp: false
  //   });
  // };
  //
  // handleSignUp = () => {
  //   this.setState({
  //     signUp: true,
  //     signIn: false
  //   });
  // };

  handleLogOut = () => {
    localStorage.removeItem("token");
    this.setState({
      loggedIn: false,
      currentUser: {},
      signIn: false,
      signIn: false
    });
  };

  displayPlayerInfo = foundPlayer => {
    this.setState({
      searchedPlayer: foundPlayer
    });
  };

  render() {
    // console.log(this.state);
    return (
      <BrowserRouter>
        <div>
          <NavBar
            loggedIn={this.state.loggedIn}
            currentUser={this.state.currentUser}
            handleLogOut={this.handleLogOut}
            displayPlayerInfo={this.displayPlayerInfo}
            allTeams={this.state.allTeams}
          />
          {this.state.loggedIn && localStorage.getItem("token") ? (
            this.state.searchedPlayer.firstName ? (
              <PlayerProfile
                searchedPlayer={this.state.searchedPlayer}
                allTeams={this.state.allTeams}
              />
            ) : (
              <div>
                <Redirect to="/scores" />
                <Route exact path="/scores" render={() => <GameScores />} />
                <Route exact path="/roster" render={() => <Roster />} />
              </div>
            )
          ) : (
            <Login setUser={this.setUser} />
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

// <div>
//   {this.state.loggedIn ? (
//     <LoggedIn
//       displayPlayerInfo={this.displayPlayerInfo}
//       loggedIn={this.state.loggedIn}
//       currentUser={this.state.currentUser}
//       handleLogOut={this.handleLogOut}
//       allTeams={this.state.allTeams}
//     />
//   ) : (
//     <NotLoggedIn
//       displayPlayerInfo={this.displayPlayerInfo}
//       loggedIn={this.state.loggedIn}
//       currentUser={this.state.currentUser}
//       handleSignIn={this.handleSignIn}
//       handleSignUp={this.handleSignUp}
//       changeToLoggedIn={this.changeToLoggedIn}
//       allTeams={this.state.allTeams}
//     />
//   )}
// </div>

// {this.state.loggedIn ? (
//   this.state.playerProfile ? (
//     <PlayerProfile
//       searchedPlayer={this.state.searchedPlayer}
//       allTeams={this.state.allTeams}
//     />
//   ) : (
//     <div>
//       <UserHome allTeams={this.state.allTeams} />
//     </div>
//   )
// ) : this.state.signIn || this.state.signUp ? (
//   <Login
//     setUser={this.setUser}
//     signIn={this.state.signIn}
//     signUp={this.state.signUp}
//   />
// ) : (
//   <UserHome allTeams={this.state.allTeams} />
// )}
