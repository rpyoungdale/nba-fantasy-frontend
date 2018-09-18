import React from "react";

class UserHome extends React.Component {
  constructor() {
    super();

    this.state = {
      allTeams: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/all-teams")
      .then(res => res.json())
      .then(json => {
        this.setState({
          allTeams: json.league.vegas
        });
      });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.allTeams.map(team => {
          return <h3 key={team.teamId}>{team.fullName}</h3>;
        })}
      </div>
    );
  }
}

export default UserHome;
