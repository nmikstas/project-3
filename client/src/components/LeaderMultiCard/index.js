import React from "react";
import "./style.css";


const MultiCardScore = (props) =>
{
    return (       
        <div className="mt-4 score-div">
            <div className="col-md-6 leader-rank-text">{props.id}
                <div className="col-md-8 data-text player">{props.player}</div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-11 score">{props.score}</div>
            </div>
        
            <div className="row no-gutters">
                <img src={require("./level.png")} class="levelImg" />
                <div className="col-md-2 score-text">Level: 
                    <div className="col-md-1 data-text">{props.level}</div>        
                </div>
                <div className="col-md-3"></div>
                <img src={require("./lines.png")} class="linesImg" />
                <div className="col-md-4 score-text">Lines cleared:
                    <div className="col-md-1 data-text">{props.lines}</div>
                </div>
            </div>
            
            <div className="row no-gutters">
                <div className="col-md-8 data-text">{props.date}</div>
            </div>
        </div>
    );
}

export default MultiCardScore;