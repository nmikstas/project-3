import React from "react";
import "./style.css";

const Spectators = (props) =>
{
    return (
        <div>
            <button data-user={props.username} onClick={props.deleteSpectator} className="deleteSpectator ml-1">X</button>
            <span></span>
            <span>{props.username}</span>
        </div>
    );
}

export default Spectators;