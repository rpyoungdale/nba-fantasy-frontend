import React from "react";

class GameCard extends React.Component {
  constructor() {
    super();

    this.state = {
      boxScore: false
    };
  }

  // viewBoxScore = () => {
  //   this.setState({
  //     boxScore: true
  //   });
  // };

  render() {
    console.log("GAME", this.props.gameInfo);
    return (
      <div className="card" style={{ width: 300 }}>
        <div className="card-body">
          <h5 className="card-title">
            {this.props.gameInfo.vTeam.triCode}
            <small>
              ({this.props.gameInfo.vTeam.win} -{" "}
              {this.props.gameInfo.vTeam.loss})
            </small>{" "}
            vs {this.props.gameInfo.hTeam.triCode}
            <small>
              ({this.props.gameInfo.hTeam.win} -{" "}
              {this.props.gameInfo.hTeam.loss})
            </small>
          </h5>
          {this.props.gameInfo.vTeam.score ? (
            <h5>
              {this.props.gameInfo.vTeam.score} -{" "}
              {this.props.gameInfo.hTeam.score}
            </h5>
          ) : (
            <h6>{this.props.gameInfo.startTimeEastern}</h6>
          )}
          <h6 className="card-subtitle mb-2 text-muted">
            {this.props.gameInfo.arena.city},{" "}
            {this.props.gameInfo.arena.stateAbbr}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">
            {this.props.gameInfo.arena.name}
          </h6>

          <a
            onClick={() => this.props.viewBoxScore(this.props.gameInfo)}
            className="card-link"
          >
            Box Score
          </a>
        </div>
      </div>

      // <div>
      // {props.gameInfo.hTeam.triCode} - {props.gameInfo.vTeam.triCode}
      // </div>
    );
  }
}

export default GameCard;
