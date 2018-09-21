import React from "react";

class GameScores extends React.Component {
  constructor() {
    super();

    this.state = {
      currentDate: ""
    };
  }

  componentDidMount() {
    let today = new Date();
    let day = today.getDate();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month.toString().length === 1) {
      month = "0" + month;
    }
    this.setState({
      currentDate: `${year}${month}${day}`
    });
  }

  render() {
    console.log(this.state);
    return <div style={{ margin: 100 }}>SHOWS TODAYS GAMES</div>;
  }
}

export default GameScores;
