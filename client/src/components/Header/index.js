import React from "react";
import "./style.css";

const Header = (props) =>
{
    return (
        <header className="header-class">
            <nav className="navbar navbar-dark navbar-expand-lg">
               

                <div className="container text-center">
                    <h1>{props.title}</h1>
                </div>

                
            </nav>
        </header>
    );
}

export default Header;