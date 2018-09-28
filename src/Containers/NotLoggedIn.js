// import React from "react";
// import NavBar from "../Components/NavBar";
// import Login from "./Login";
// import GameScores from "./GameScores";
// // import PlayerProfile from "../Components/PlayerProfile";
// import { BrowserRouter, Route, Redirect } from "react-router-dom";
//
// const baseURL = "http://localhost:3000";
//
// class NotLoggedIn extends React.Component {
//   constructor() {
//     super();
//
//     this.state = {
//       playerProfile: false,
//       signIn: false,
//       signUp: false,
//       searchedPlayer: {}
//     };
//   }
//
//   handleSignIn = () => {
//     this.setState({
//       signIn: true,
//       signUp: false
//     });
//   };
//
//   handleSignUp = () => {
//     this.setState({
//       signUp: true,
//       signIn: false
//     });
//   };
//
//   viewScores = () => {
//     this.setState({
//       signUp: false,
//       signIn: false
//     });
//   };
//
//   setUser = () => {
//     // debugger;
//     fetch(`${baseURL}/user`, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//       }
//     })
//       .then(res => res.json())
//       .then(json => this.props.changeToLoggedIn(json));
//   };
//
//   displayPlayerInfo = searchedPlayer => {
//     this.setState({
//       searchedPlayer: searchedPlayer,
//       playerProfile: true
//     });
//   };
//
//   render() {
//     return (
//       <div>
//         <NavBar
//           displayPlayerInfo={this.displayPlayerInfo}
//           loggedIn={this.props.loggedIn}
//           handleSignIn={this.handleSignIn}
//           handleSignUp={this.handleSignUp}
//           viewScores={this.viewScores}
//         />
//         {this.state.playerProfile ? (
//           <PlayerProfile
//             searchedPlayer={this.state.searchedPlayer}
//             allTeams={this.props.allTeams}
//           />
//         ) : this.state.signIn || this.state.signUp ? (
//           <Login
//             setUser={this.setUser}
//             signIn={this.state.signIn}
//             signUp={this.state.signUp}
//           />
//         ) : (
//           <GameScores />
//         )}
//       </div>
//     );
//   }
// }
//
// export default NotLoggedIn;
