import React from "react";
import "./style.css";

const SingleCardScore = (props) =>
{
    return (
        <div className="mt-4 score-div" style={props.color} >
        <div className="row no-gutters">
            <div className="col-md-2 leader-rank-text">{props.id}</div>
            <div className="col-md-10 player-text">{props.username}</div>
        </div>
        <div className="row no-gutters">
            <div className="col-md-11 score">{props.score1}</div>
        </div>
                
        <div className="row no-gutters">
                <img src={require("./level.png")} class="levelImg" alt="level"/>
                <div className="col-md-2 score-text">Level: 
                    <div className="col-md-1 data-text">{props.level1}</div>        
                </div>
                <div className="col-md-3"></div>
                <img src={require("./lines.png")} class="linesImg" alt="lines" />
                <div className="col-md-4 score-text">Lines cleared:
                    <div className="col-md-1 data-text">{props.lines1}</div>
                </div>
            </div>
            
            <div className="row no-gutters"> 
                <div className="col-md-8 data-text">{props.timestamp1}</div>
            </div>
        </div>
    );
}
 
export default SingleCardScore;
