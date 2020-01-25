import React from "react";
import "./style.css";

const TickerLabel2 = (props) =>
{
    return (
        <div className="col-md-3">
            <label className="form-label"><strong>{props.stuff}</strong></label>
            <span className="input-text">{props.ticker}</span>
        </div>
    );
}

export default TickerLabel2;