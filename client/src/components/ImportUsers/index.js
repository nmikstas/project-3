import React from "react";
import "./style.css";

const ImportUsers = (props) =>
{
    return (
        <div>
            <button data-user={props.username} data-index={props.index} onClick={props.addSpectator} className="addSpectator ml-1">S</button>
            <button data-user={props.username} data-index={props.index} onClick={props.addModerator} className="addModerator mx-1">M</button>
            <button data-user={props.username} data-index={props.index} onClick={props.addVersus} className="addVersus mr-2">V</button>
            <span className="text-white">{props.username}</span>
        </div>
    );
}

export default ImportUsers;