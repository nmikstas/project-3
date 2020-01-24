import React from "react";
import "./style.css";

const SSpectator = (props) =>
{
    return (
        <div>
            <button data-user={props.username} onClick={props.deleteSpectator} className="deleteSpectator ml-1">X</button>
            <button data-user={props.username} className="addSpectator mx-1 px-2">S</button>
            <span>{props.username}</span>
        </div>
    );
}

export default SSpectator;