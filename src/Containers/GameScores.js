import React from "react";
import GameCard from "../Components/GameCard";

const baseURL = "http://localhost:3000";

class GameScores extends React.Component {
  constructor() {
    super();

    this.state = {
      currentDate: "",
      gameList: []
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
    this.getScores(`${year}${month}${day}`);
  }

  getScores = date => {
    // debugger;
    fetch(`${baseURL}/game-scores`, {
      method: "POST",
      body: JSON.stringify({
        current_date: date
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          gameList: json.games
        });
      });
  };

  render() {
    // console.log(this.state);
    return (
      <div style={{ margin: 100 }}>
        <h1>{this.state.gameList.length} Games Today</h1>
        {this.state.gameList.length
          ? this.state.gameList.map(game => {
              return <GameCard key={game.gameId} gameInfo={game} />;
            })
          : null}
      </div>
    );
  }
}

export default GameScores;
