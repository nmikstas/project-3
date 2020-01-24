import React from "react";
import "./style.css";
import NavBar from "../../components/NavBar";
import API from "../../utils/API";

class Leaderboard extends React.Component
{
    state =
    {
       debug: true
    }

    componentDidMount = () =>
    {
        //Check if the user is logged in or not.
        API.verify()
        .then((res) =>
        {
            //If not, boot 'em out!
            if(res.data.notLoggedIn)
            {
                window.location.href = "/denied";
            }

            this.setState({ username: res.data.username });
            
            if(this.state.debug)console.log(res.data);
        })
        .catch(err =>
        {
            console.log(err);
            window.location.href = "/denied";
        });
    }

    render = () =>
    {
        return (
            <div className="container-fluid">
                <NavBar
                    username={this.state.username}
                />
                <h1>Leaderboard</h1>
            </div>
        )
    }
}

export default Leaderboard;