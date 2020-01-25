import React from "react";
import "./style.css";

const MSpectator = (props) =>
{
    return (
        <div>
            <button data-user={props.username} onClick={props.deleteSpectator} className="deleteSpectator ml-1">X</button>
            <button data-index={props.index} onClick={props.changeToSpectator} className="addModerator ml-1 mr-2">M</button>
            <span className="text-white">{props.username}</span>
        </div>
    );
}

export default MSpectator;