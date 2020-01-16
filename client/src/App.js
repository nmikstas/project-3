import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/index";
import Signup from "./pages/Signup/index";
import Denied from "./pages/Denied";
import "./style.css";

function App()
{
    return (
        <div id="page-body">
            <div className="container-fluid router-body">
                <Router>   
                    <Switch> 
                        <Route exact path="/" component={Login} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/home" component={Home} />
                        <Route component={Denied} />
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
