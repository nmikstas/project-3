import React from "react";
import Header from "../components/Header";
import "../style.css";
import API from "../utils/API";

class Login extends React.Component
{
    state =
    {
        
    }

    componentDidMount = () =>
    {

    }

    render = () =>
    {
        return (
            <div className="container-fluid">
                
                <Header 
                    title="NOT TETRIS NOT TWITCH"
                />
                <h2>Login</h2>
                
            </div>
        )
    }
}

export default Login;