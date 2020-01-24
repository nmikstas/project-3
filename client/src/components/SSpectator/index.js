import React from "react";
import "./style.css";

const SSpectator = (props) =>
{
    return (
        <div>
            <button data-user={props.username} onClick={props.deleteSpectator} className="deleteSpectator ml-1">X</button>
            <button data-index={props.index} onClick={props.changeToModerator} className="addSpectator mx-1 px-2">S</button>
            <span className="text-white">{props.username}</span>
        </div>
    );
}

export default SSpectator;