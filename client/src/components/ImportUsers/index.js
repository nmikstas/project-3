import React from "react";
import "./style.css";

const ImportUsers = (props) =>
{
    return (
        <div>
            <button data-user={props.username} data-index={props.index} onClick={props.addSpectator} className="addSpectator ml-1">S</button>
            <button data-user={props.username} data-index={props.index} onClick={props.addModerator} className="addModerator mx-1">M</button>
            {
                !props.versus ?
                    <button data-user={props.username} data-index={props.index} onClick={props.addVersus} className="addVersus mr-1">V</button>
                    :
                    null
            }
            <span className="text-white ml-1">{props.username}</span>
        </div>
    );
}

export default ImportUsers;