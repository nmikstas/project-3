import React from "react";
import "./style.css";

const LeaderSingleCard = (props) =>
{
    return (
        <div className="mt-4 score-div">
            <div className="score-header">{props.player1} score on {props.timestamp1}</div>
            <div className="row no-gutters">
                <div className="col-md-6 score-text">Score: </div>
                <div className="col-md-6 data-text">{props.score1}</div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-6 score-text">Level: </div>
                <div className="col-md-6 data-text">{props.level1}</div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-6 score-text">Lines: </div>
                <div className="col-md-6 data-text">{props.lines1}</div>
            </div>    
        </div>
    );
}

export default LeaderSingleCard;