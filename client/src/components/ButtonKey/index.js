import React from "react";
import "./style.css";

const ButtonKey = (props) =>
{
    return (
        <div className="col-md-12">
            <label className="form-label mr-2"><strong>Key:</strong></label>
            <button className="addSpectator mr-2">S</button>
            <span className="button-text mr-2">Spectator</span>
            <button className="addModerator mr-2">M</button>
            <span className="button-text mr-2">Chat Moderator</span>
            <button className="addVersus mr-2">V</button>
            <span className="button-text mr-2">Versus Player</span>
            <button className="deleteSpectator mr-2">X</button>
            <span className="button-text">Delete</span>
        </div>
    );
}

export default ButtonKey;