import React from "react";

const baseURL = "http://localhost:3000";

class UserHome extends React.Component {
  constructor() {
    super();

    this.state = {
      allTeams: []
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
