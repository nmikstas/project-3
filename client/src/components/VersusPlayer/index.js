import React from "react";
import "./style.css";

const VersusPlayer = (props) =>
{
    return (
        <div>
            <input className="versusPlayer form-control" value={props.versusPlayer} readOnly onChange={props.versusPlayerUpdate}/>
        </div>
    );
}

export default VersusPlayer;