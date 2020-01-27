import React from "react";
import "./style.css";

const LeaderScoreBox = (props) =>
{
    return (
        <div className="mt-4 score-div">
            <div className="score-header">{this.state.leaderScore} score on {this.state.date}</div>
            <div className="row no-gutters">
                <div className="col-md-6 score-text">Score: </div>
                <div className="col-md-6 data-text">{this.state.myScore}</div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-6 score-text">Level: </div>
                <div className="col-md-6 data-text">{this.state.myLevel}</div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-6 score-text">Lines: </div>
                <div className="col-md-6 data-text">{this.state.myLines}</div>
            </div>    
        </div>
    );
}

export default LeaderScoreBox;