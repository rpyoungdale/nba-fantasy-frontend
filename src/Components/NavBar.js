import React from "react";
import { Link } from "react-router-dom";

const baseURL = "http://localhost:3000";

class NavBar extends React.Component {
  constructor() {
    super();

    this.state = {
      player: "",
      playerNames: [],
      playerDetails: []
    };
  }

  // componentDidMount() {
  // fetch(`${baseURL}/find-player`)
  //   .then(res => res.json())
  //   .then(json => this.parsePlayers(json));
  // }

  render() {
    console.log(this.props);
    return (
      <nav
        className="navbar fixed-top navbar-expand-lg navbar-light bg-light"
        style={{ marginBottom: 100 }}
      >
        <a className="navbar-brand">
          NBAFantasy <span role="img">🏀</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {this.props.loggedIn ? (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link
                  to="/scores"
                  style={{ color: "#000000" }}
                  className="nav-link"
                >
                  Today's Games
                </Link>
              </li>
              <li className="nav-item active">
                <Link
                  to="/roster"
                  style={{ color: "#000000" }}
                  className="nav-link"
                >
                  My Roster
                </Link>
              </li>
              <li className="nav-item active">
                <Link
                  to="/search"
                  style={{ color: "#000000" }}
                  className="nav-link"
                >
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={this.props.handleLogOut}>
                  Logout {this.props.currentUser.first_name}
                </a>
              </li>
            </ul>
          </div>
        ) : null}
      </nav>
    );
  }
}

export default NavBar;

// <form
//   className="form-inline my-2 my-lg-0"
//   onSubmit={this.findPlayer}
// >
//   <input
//     className="form-control mr-sm-2"
//     type="search"
//     placeholder="Player Lookup"
//     aria-label="Search"
//     onChange={this.updatePlayer}
//   />
//   <button
//     className="btn btn-outline-success my-2 my-sm-0"
//     type="submit"
//   >
//     Search
//   </button>
// </form>

// <div className="collapse navbar-collapse" id="navbarSupportedContent">
//   <ul className="navbar-nav mr-auto">
//     <li className="nav-item" onClick={this.props.viewScores}>
//       <a className="nav-link">Today's Games</a>
//     </li>
//     <li className="nav-item dropdown">
//       <a
//         className="nav-link dropdown-toggle"
//         id="navbarDropdown"
//         role="button"
//         data-toggle="dropdown"
//         aria-haspopup="true"
//         aria-expanded="false"
//       >
//         Login
//       </a>
//       <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//         <a
//           className="dropdown-item"
//           onClick={this.props.handleSignIn}
//         >
//           Sign In
//         </a>
//         <div className="dropdown-divider" />
//         <a
//           className="dropdown-item"
//           onClick={this.props.handleSignUp}
//         >
//           Sign Up
//         </a>
//       </div>
//     </li>
//   </ul>
//   <form
//     className="form-inline my-2 my-lg-0"
//     onSubmit={this.findPlayer}
//   >
//     <input
//       className="form-control mr-sm-2"
//       type="search"
//       placeholder="Player Lookup"
//       aria-label="Search"
//       onChange={this.updatePlayer}
//     />
//     <button
//       className="btn btn-outline-success my-2 my-sm-0"
//       type="submit"
//     >
//       Search
//     </button>
//   </form>
// </div>
