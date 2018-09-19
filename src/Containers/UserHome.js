import React from "react";

const baseURL = "http://localhost:3000";

class UserHome extends React.Component {
  constructor() {
    super();

    this.state = {
      allTeams: []
    };
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {this.props.allTeams.map(team => {
          return <h3 key={team.teamId}>{team.fullName}</h3>;
        })}
      </div>
    );
  }
}

export default UserHome;
