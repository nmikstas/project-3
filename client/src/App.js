import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/index";
import CreateForum from "./pages/CreateForum/index";
import Scores from "./pages/Scores/index";
import Leaderboard from "./pages/Leaderboard/index";
import UserSettings from "./pages/UserSettings/index";
import Logout from "./pages/Logout/index";
import Login from "./pages/Login/index";
import Signup from "./pages/Signup/index";
import Denied from "./pages/Denied/index";
import "./style.css";

function App()
{
    return (
        <div id="page-body">
            <div className="container-fluid router-body">
                <Router>
                    <div>
                        <Switch> 
                            <Route exact path="/" component={Login} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/createforum" component={CreateForum} />
                            <Route exact path="/scores" component={Scores} />
                            <Route exact path="/leaderboard" component={Leaderboard} />
                            <Route exact path="/UserSettings" component={UserSettings} />
                            <Route exact path="/Logout" component={Logout} />
                            <Route component={Denied} />
                        </Switch>
                    </div>
                </Router>
            </div>
        </div>
    );
}

export default App;
