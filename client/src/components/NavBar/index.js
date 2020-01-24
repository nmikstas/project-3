import React from "react";
import { NavLink } from 'react-router-dom';
import "./style.css";

const Nav = (props) =>
{
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-site">
           
            <h4>Hello, {props.username}!</h4>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse collapse" id="navbarText">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink
                            exact
                            activeClassName="navbar__link--active"
                            className="navbar__link"
                            to="/home"
                        >
                        Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            exact
                            activeClassName="navbar__link--active"
                            className="navbar__link"
                            to="/createforum"
                        >
                        Create Forum
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            exact
                            activeClassName="navbar__link--active"
                            className="navbar__link"
                            to="/scores"
                        >
                        Scores
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            exact
                            activeClassName="navbar__link--active"
                            className="navbar__link"
                            to="/leaderboard"
                        >
                        Leaderboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            exact
                            activeClassName="navbar__link--active"
                            className="navbar__link"
                            to="/usersettings"
                        >
                        User Settings
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            exact
                            activeClassName="navbar__link--active"
                            className="navbar__link"
                            to="/logout"
                        >
                        Log Out
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
