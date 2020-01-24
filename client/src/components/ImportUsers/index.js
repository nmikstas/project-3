import React from "react";
import "./style.css";

const ImportUsers = (props) =>
{
    return (
        <div>
            <button data-user={props.username} onClick={props.addSpectator} className="addSpectator ml-1">S</button>
            <button data-user={props.username} onClick={props.addModerator} className="addModerator mx-1">M</button>
            <button data-user={props.username} onClick={props.addVersus} className="addVersus mr-1">V</button>
            <span className="text-white">{props.username}</span>
        </div>
    );
}

export default ImportUsers;