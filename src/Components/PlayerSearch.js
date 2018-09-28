import React from "react";

const baseURL = "http://localhost:3000";

class PlayerSearch extends React.Component {
  constructor() {
    super();

    this.state = {
      team: "",
      searchInput: "",
      searchedPlayer: {},
      playerNames: [],
      playerDetails: []
    };
  }

  componentDidMount = () => {
    fetch(`${baseURL}/find-player`)
      .then(res => res.json())
      .then(json => this.parsePlayers(json));
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
    // debugger;
    let searchedPlayer = this.state.searchInput;
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
    this.displayPlayerInfo(foundPlayer);
  };

  displayPlayerInfo = foundPlayer => {
    let team = this.props.allTeams.find(team => {
      return team.teamId === foundPlayer.teamId;
    });
    this.setState({
      team: team.fullName,
      searchedPlayer: foundPlayer
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    // if (this.props !== prevProps) {
    //   let team = this.props.allTeams.find(team => {
    //     return team.teamId === this.props.searchedPlayer.teamId;
    //   });
    //   this.setState({
    //     team: team.fullName,
    //     player: this.props.searchedPlayer
    //   });
    // }
  };

  updatePlayer = e => {
    // debugger;
    this.setState({
      player: e.target.value
    });
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

  handleInput = e => {
    this.setState({
      searchInput: e.target.value
    });
  };

  render() {
    console.log("search", this.state);
    return (
      <div>
        <form style={{ margin: 100 }} onSubmit={this.findPlayer}>
          <input type="text" onChange={this.handleInput} />
          <button>Search</button>
        </form>
        {this.state.searchedPlayer.firstName ? (
          <div className="card" style={{ margin: 100 }}>
            <div className="card-header">
              {this.state.searchedPlayer.firstName}{" "}
              {this.state.searchedPlayer.lastName} - #{
                this.state.searchedPlayer.jersey
              }
            </div>
            <div className="card-body">
              <h5 className="card-title">{this.state.team}</h5>
              <p className="card-text">
                Weight: {this.state.searchedPlayer.weightPounds} lbs
              </p>
              <a className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default PlayerSearch;
