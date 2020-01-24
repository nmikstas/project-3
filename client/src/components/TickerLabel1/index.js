import React from "react";
import "./style.css";

const TickerLabel1 = (props) =>
{
    return (
        <div className="col-md-6">
            <label className="form-label">{props.stuff} {props.ticker}</label>
        </div>
    );
}

export default TickerLabel1;