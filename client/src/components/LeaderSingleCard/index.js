import React from "react";
import "./style.css";

const SingleCardScore = (props) =>
{
    return (
        <div className="mt-4 score-div">
            <div className="row no-gutters">
                <div className="col-md-6 leader-rank-text">{props.id}</div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-4 score-text">Player: </div>
                <div className="col-md-8 data-text">{props.player1}</div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-4 score-text">Score: </div>
                <div className="col-md-8 data-text">{props.score1}</div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-4 score-text">Level: </div>
                <div className="col-md-8 data-text">{props.level1}</div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-4 score-text">Lines: </div>
                <div className="col-md-8 data-text">{props.lines1}</div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-4 score-text">Date: </div>
                <div className="col-md-8 data-text">{props.timestamp1}</div>
            </div>   
        </div>
    );
}

export default SingleCardScore;
