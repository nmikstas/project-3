import React from "react";
import "./style.css";

const TickerLabel1 = (props) =>
{
    return (
        <div className="col-md-6">
            <label className="form-label"><strong>{props.stuff}</strong> {props.ticker}</label>
        </div>
    );
}

export default TickerLabel1;