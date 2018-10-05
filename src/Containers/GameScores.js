import React from "react";
import GameCard from "../Components/GameCard";
import BoxScore from "../Components/BoxScore";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const baseURL = "http://localhost:3000";

class GameScores extends React.Component {
  constructor() {
    super();

    this.state = {
      currentDate: "",
      gameList: [],
      loaded: false,
      boxScoreView: false,
      boxScoreGame: {},
      players: []
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
    fetch(`${baseURL}/find-player`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          currentDate: `${year}${month}${day}`,
          players: json.league.standard
        });
      });
    this.getScores(`${year}${month}${day}`);
    this.scoreInterval = setInterval(() => {
      console.log("RUN");
      this.getScores(`${year}${month}${day}`);
    }, 10000);
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

  viewBoxScore = game => {
    // debugger;
    this.setState({
      boxScoreView: true,
      boxScoreGame: game
    });
  };

  render() {
    console.log("SCORES", this.state);
    return (
      <div>
        {this.state.loaded ? (
          <div style={{ margin: 100 }}>
            {this.state.boxScoreView ? (
              <BoxScore
                boxScoreGame={this.state.boxScoreGame}
                players={this.state.players}
              />
            ) : (
              <div>
                <h1>{this.state.gameList.length} Games Today</h1>
                {this.state.gameList.map(game => {
                  return (
                    <GameCard
                      key={game.gameId}
                      gameInfo={game}
                      players={this.state.players}
                      viewBoxScore={this.viewBoxScore}
                    />
                  );
                })}
              </div>
            )
            // <Loader active inline="centered" />
            }
          </div>
        ) : null}
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
