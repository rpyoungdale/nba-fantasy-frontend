import React from "react";

const GameCard = props => {
  console.log("GAME", props.gameInfo);
  return (
    <div className="card" style={{ width: 300 }}>
      <div className="card-body">
        <h5 className="card-title">
          {props.gameInfo.vTeam.triCode}
          <small>
            ({props.gameInfo.vTeam.win} - {props.gameInfo.vTeam.loss})
          </small>{" "}
          vs {props.gameInfo.hTeam.triCode}
          <small>
            ({props.gameInfo.hTeam.win} - {props.gameInfo.hTeam.loss})
          </small>
        </h5>
        {props.gameInfo.vTeam.score ? (
          <h5>
            {props.gameInfo.vTeam.score} - {props.gameInfo.hTeam.score}
          </h5>
        ) : (
          <h6>{props.gameInfo.startTimeEastern}</h6>
        )}
        <h6 className="card-subtitle mb-2 text-muted">
          {props.gameInfo.arena.city}, {props.gameInfo.arena.stateAbbr}
        </h6>
        <h6 className="card-subtitle mb-2 text-muted">
          {props.gameInfo.arena.name}
        </h6>

        <a href="#" className="card-link">
          Box Score
        </a>
      </div>
    </div>

    // <div>
    // {props.gameInfo.hTeam.triCode} - {props.gameInfo.vTeam.triCode}
    // </div>
  );
};

export default GameCard;
