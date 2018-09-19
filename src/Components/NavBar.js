import React from "react";

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

  updatePlayer = e => {
    // debugger;
    this.setState({
      player: e.target.value
    });
  };

  parsePlayers = players => {
    //--Parses json into an array of the players first and last names
    //--put together and also saves the detailed player info for later
    let arr = [];
    players.league.standard.forEach(player => {
      arr.push(`${player.firstName} ${player.lastName}`);
    });
    this.setState({
      playerNames: arr,
      playerDetails: players.league.standard
    });
  };

  findPlayer = e => {
    e.preventDefault();
    let searchedPlayer = this.state.player;
    let searched = this.state.playerNames.filter(player => {
      let splitPlayer = searchedPlayer.split(" ");
      let first = splitPlayer[0].toLowerCase();
      if (splitPlayer[1]) {
        let last = splitPlayer[1].toLowerCase();
        return (
          player.toLowerCase().includes(first) &&
          player.toLowerCase().includes(last)
        );
      } else {
        return player.toLowerCase().includes(first);
      }
    });
    this.getPlayerDetails(searched);
  };

  getPlayerDetails = player => {
    // debugger;
    let splitPlayer = player[0].split(" ");

    let foundPlayer = this.binarySearch(
      this.state.playerDetails,
      splitPlayer[1],
      splitPlayer[0]
    );
    // debugger;
    this.props.displayPlayerInfo(foundPlayer);
  };

  binarySearch = (arr, last, first) => {
    //recursively searches detailed players list for matching name
    if (arr.length === 1) {
      return arr[0];
    }
    let length = arr.length;
    let midPoint = Math.floor(length / 2);
    // console.log(arr);
    if (arr[midPoint].lastName === last) {
      if (
        arr[midPoint].lastName === last &&
        arr[midPoint].firstName === first
      ) {
        return arr[midPoint];
      } else if (arr[midPoint].firstName > first) {
        let newArr = arr.slice(0, midPoint);
        return this.binarySearch(newArr, last, first);
      } else if (arr[midPoint].firstName <= first) {
        let newArr = arr.slice(midPoint, arr.length);
        return this.binarySearch(newArr, last, first);
      }
    } else if (arr[midPoint].lastName > last) {
      let newArr = arr.slice(0, midPoint);
      return this.binarySearch(newArr, last, first);
    } else if (arr[midPoint].lastName <= last) {
      let newArr = arr.slice(midPoint, arr.length);
      return this.binarySearch(newArr, last, first);
    } else {
      return arr;
    }
  };

  componentDidMount() {
    fetch(`${baseURL}/find-player`)
      .then(res => res.json())
      .then(json => this.parsePlayers(json));
  }

  render() {
    console.log(this.state);
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">NBAFantasy</a>
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

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link">
                Roster <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Today's Games</a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item">Action</a>
                <a className="dropdown-item">Another action</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item">Something else here</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">Disabled</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0" onSubmit={this.findPlayer}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Player Lookup"
              aria-label="Search"
              onChange={this.updatePlayer}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default NavBar;
