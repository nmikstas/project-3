import React from "react";
import "./style.css";

const ScoreBox = (props) =>
{
    return (
        <div className="mt-4 score-div">
            <div className="score-header">Your score on </div>  
            <div className="row no-gutters">
                <div className="col-md-6 score-text">Score: </div>
                <div className="col-md-6 data-text"></div> 
            </div>
            <div className="row no-gutters">
                <div className="col-md-6 score-text">Level: </div>
                <div className="col-md-6 data-text"></div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-6 score-text">Lines: </div>
                <div className="col-md-6 data-text"></div>
            </div>    
        </div>
    );
}

export default ScoreBox;