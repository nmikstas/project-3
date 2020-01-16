import React from "react";

const ErrorBox = (props) =>
{
    if(props.showError)
    {
        return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{props.title}</strong> {props.message}
                <button type="button" className="close" aria-label="Close" onClick={props.dismissError}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
    else
    {
        return null;
    }
}

export default ErrorBox;