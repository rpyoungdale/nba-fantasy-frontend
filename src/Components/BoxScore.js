import React from "react";

const baseURL = "http://localhost:3000";

class BoxScore extends React.Component {
  constructor() {
    super();

    this.state = {
      boxScoreData: {}
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
    fetch(`${baseURL}/boxscore`, {
      method: "POST",
      body: JSON.stringify({
        game_id: this.props.boxScoreGame.gameId,
        game_date: `${year}${month}${day}`
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          boxScoreData: json
        });
      });
  }

  render() {
    console.log("BOXSCORE", this.state);
    return (
      <div className="card" style={{ width: 300 }}>
        <div className="card-body">
          <h5 className="card-title">
            {this.props.boxScoreGame.vTeam.triCode}
            <small>
              ({this.props.boxScoreGame.vTeam.win} -{" "}
              {this.props.boxScoreGame.vTeam.loss})
            </small>{" "}
            vs {this.props.boxScoreGame.hTeam.triCode}
            <small>
              ({this.props.boxScoreGame.hTeam.win} -{" "}
              {this.props.boxScoreGame.hTeam.loss})
            </small>
          </h5>
          {this.props.boxScoreGame.vTeam.score ? (
            <h5>
              {this.props.boxScoreGame.vTeam.score} -{" "}
              {this.props.boxScoreGame.hTeam.score}
            </h5>
          ) : (
            <h6>{this.props.boxScoreGame.startTimeEastern}</h6>
          )}
          <h6 className="card-subtitle mb-2 text-muted">
            {this.props.boxScoreGame.arena.city},{" "}
            {this.props.boxScoreGame.arena.stateAbbr}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">
            {this.props.boxScoreGame.arena.name}
          </h6>

          <a
            onClick={() => this.props.viewBoxScore(this.props.boxScoreGame)}
            className="card-link"
          >
            Box Score
          </a>
        </div>
      </div>
    );
  }
}

export default BoxScore;
