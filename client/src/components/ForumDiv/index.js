import React from "react";
import "./style.css";

function ForumDiv(props)
{
    return (
        <div className="forum-div my-2">
            <div className="row no-gutters">
                <div className="col-md-4 forum-item">Forum Name: </div>
                <div className="col-md-8 forum-value">{props.forumName}</div>
            </div>

            <div className="row no-gutters">
                <div className="col-md-4 forum-item">{props.alt}</div>
                <span className="col-md-8 forum-value">{props.altValue + " "}
                    {props.addIcon ? <button className={props.iconClass}>{props.iconText}</button> : null}
                </span>
            </div>

            <div className="row no-gutters">
                <div className="col-md-4 forum-item">Created: </div>
                <div className="col-md-8 forum-value">{props.created}</div>
            </div>

            <div className="row no-gutters">
                <div className="col-md-6 text-center">
                    <button className="btn btn-outline-success m-1" onClick={() => props.enter(props.forumId)}>Enter</button>
                </div>
                <div className="col-md-6 text-center">
                    <button className="btn btn-outline-primary m-1" onClick={() => props.delete(props.forumId)}>Delete</button>
                </div>
            </div>
            
        </div>
    );
}

export default ForumDiv;
