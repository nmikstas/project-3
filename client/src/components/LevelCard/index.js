import React from "react";
import "./style.css";

const LevelCard = (props) => 
{
    return (
      <div className="card">
        <div className={"img-container text-white " + props.selected} onClick={() => props.selectLevels(props.id)}>
          {props.LevelValue}
        </div>
      </div>
    );
}

export default LevelCard;