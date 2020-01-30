import React from "react";
import Header from "../../components/Header";
import "./style.css";

function Denied()
{
    return (
        <div>
            <Header 
                title="NOT TETRIS-NOT TWITCH"
            />

            <h1>Access Denied</h1>

            <div className="container">
                <div className="denied-div">
                    <div className="denied-message pb-3">You Are Not Authorized to View This Page</div>
                    <div className="denied-info mt-3">You may not be signed in. You can <a href="/login">login</a> or <a href="/signup">signup</a> here.</div>
             </div>
            </div>
        </div>
    );
}

export default Denied;
