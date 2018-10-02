import React from "react";
import GameCard from "../Components/GameCard";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const baseURL = "http://localhost:3000";

class GameScores extends React.Component {
  constructor() {
    super();

    this.state = {
      currentDate: "",
      gameList: [],
      loaded: false
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
    if (day.toString().length === 1) {
      day = "0" + day;
    }
    this.setState({
      currentDate: `${year}${month}${day}`
    });
    this.getScores(`${year}${month}${day}`);

    this.scoreInterval = setInterval(() => {
      console.log("RUN");
      this.getScores(`${year}${month}${day}`);
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.scoreInterval);
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
          gameList: json.games,
          loaded: true
        });
      });
  };

  render() {
    // console.log(this.state);
    return (
      <div style={{ margin: 100 }}>
        {this.state.loaded ? (
          <div>
            <h1>{this.state.gameList.length} Games Today</h1>
            {this.state.gameList.map(game => {
              return <GameCard key={game.gameId} gameInfo={game} />;
            })}
          </div>
        ) : null
        // <Loader active inline="centered" />
        }
      </div>
    );
  }
}

export default GameScores;

//
// {this.state.gameList.length
//   ? this.state.gameList.map(game => {
//       return <GameCard key={game.gameId} gameInfo={game} />;
//     })
//   : null}
