import React from "react";
import "./style.css";

const MSpectator = (props) =>
{
    return (
        <div>
            <button data-user={props.username} onClick={props.deleteSpectator} className="deleteSpectator ml-1">X</button>
            <button data-user={props.username} className="addModerator mx-1">M</button>
            <span>{props.username}</span>
        </div>
    );
}

export default MSpectator;