import React, { Component } from "react";
import "./App.css";
import UserHome from "./Containers/UserHome";
import LandingPage from "./Containers/LandingPage";
import Login from "./Containers/Login";
import NavBar from "./Components/NavBar";
import PlayerProfile from "./Components/PlayerProfile";

const baseURL = "http://localhost:3000";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      signIn: false,
      signUp: false,
      currentUser: {},
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
  }

  displayPlayerInfo = searchedPlayer => {
    this.setState({
      searchedPlayer: searchedPlayer,
      playerProfile: true
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
      .then(json => {
        this.setState({
          currentUser: json,
          loggedIn: true,
          signIn: false,
          signUp: false
        });
      });
  };

  handleSignIn = () => {
    this.setState({
      signIn: true,
      signUp: false
    });
  };

  handleSignUp = () => {
    this.setState({
      signUp: true,
      signIn: false
    });
  };

  handleLogOut = () => {
    localStorage.removeItem("token");
    this.setState({
      loggedIn: false,
      currentUser: {},
      signIn: false,
      signIn: false
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <NavBar
          displayPlayerInfo={this.displayPlayerInfo}
          loggedIn={this.state.loggedIn}
          currentUser={this.state.currentUser}
          handleSignIn={this.handleSignIn}
          handleSignUp={this.handleSignUp}
          handleLogOut={this.handleLogOut}
        />
        {this.state.loggedIn ? (
          this.state.playerProfile ? (
            <PlayerProfile
              searchedPlayer={this.state.searchedPlayer}
              allTeams={this.state.allTeams}
            />
          ) : (
            <div>
              <UserHome allTeams={this.state.allTeams} />
            </div>
          )
        ) : this.state.signIn || this.state.signUp ? (
          <Login
            setUser={this.setUser}
            signIn={this.state.signIn}
            signUp={this.state.signUp}
          />
        ) : (
          <LandingPage />
        )}
      </div>
    );
  }
}

export default App;
