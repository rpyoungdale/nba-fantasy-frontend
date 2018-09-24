import React from "react";

const GameCard = props => {
  console.log("GAME", props.gameInfo);
  return (
    <div class="card" style={{ width: 300 }}>
      <div class="card-body">
        <h5 class="card-title">
          {props.gameInfo.hTeam.triCode}
          <small>
            ({props.gameInfo.hTeam.win} - {props.gameInfo.hTeam.loss})
          </small>{" "}
          vs {props.gameInfo.vTeam.triCode}
          <small>
            ({props.gameInfo.vTeam.win} - {props.gameInfo.vTeam.loss})
          </small>
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">
          {props.gameInfo.arena.city}, {props.gameInfo.arena.stateAbbr}
        </h6>
        <h6 class="card-subtitle mb-2 text-muted">
          {props.gameInfo.arena.name}
        </h6>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" class="card-link">
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
