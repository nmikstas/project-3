import React from "react";
import "./style.css";

const LeaderMultiCard = (props) =>
{
    return (
        <div className="mt-4 score-div">
            <div className="score-header">{props.player} score on {props.date}</div>
            <div className="row no-gutters">
                <div className="col-md-6 score-text">Score: </div>
                <div className="col-md-6 data-text">{props.score}</div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-6 score-text">Level: </div>
                <div className="col-md-6 data-text">{props.level}</div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-6 score-text">Lines: </div>
                <div className="col-md-6 data-text">{props.lines}</div>
            </div>    
        </div>
    );
}

export default LeaderMultiCard;