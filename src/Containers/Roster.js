import React from "react";

class Roster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teamName: this.props.currentUser.team.team_name,
      players: []
    };
  }

  componentDidMount() {
    let players = [];
    this.props.currentUser.team.players.forEach(player => {
      players.push(player);
    });

    this.setState({
      players: players
    });
  }

  render() {
    return (
      <div style={{ margin: 100 }}>
        <h1>{this.state.teamName}</h1>
        {this.state.players.map(player => {
          return <h5 key={player.person_id}>{player.first_name}</h5>;
        })}
      </div>
    );
  }
}

export default Roster;
