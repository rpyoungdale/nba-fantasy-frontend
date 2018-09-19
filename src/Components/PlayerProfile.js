import React from "react";

class PlayerProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      team: "",
      player: ""
    };
  }

  componentDidMount = () => {
    let team = this.props.allTeams.find(team => {
      return team.teamId === this.props.searchedPlayer.teamId;
    });
    this.setState({
      team: team.fullName,
      player: this.props.searchedPlayer
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      let team = this.props.allTeams.find(team => {
        return team.teamId === this.props.searchedPlayer.teamId;
      });
      this.setState({
        team: team.fullName,
        player: this.props.searchedPlayer
      });
    }
  };

  render() {
    return (
      <div className="card" style={{ margin: 100 }}>
        <div className="card-header">
          {this.state.player.firstName} {this.state.player.lastName} - #{
            this.state.player.jersey
          }
        </div>
        <div className="card-body">
          <h5 className="card-title">{this.state.team}</h5>
          <p className="card-text">
            Weight: {this.state.player.weightPounds} lbs
          </p>
          <a className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    );
  }
}

export default PlayerProfile;
