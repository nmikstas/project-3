import React from "react";
import "./style.css";
import NavBar from "../../components/NavBar";
import SingleCardScore from "../../components/SingleCardScore";
import MultiCardScore from "../../components/MultiCardScore";
import API from "../../utils/API";

class Scores extends React.Component
{
    state =
    {
       debug: true,
       username: "",
       singleUserData: [],
       multiUserData: [],
    }

    componentDidMount = () =>
    {
        //Check if the user is logged in or not.
        API.verify().then((res) =>
        {
            //If not, boot 'em out!
            if(res.data.notLoggedIn)
            {
                window.location.href = "/denied";
            }

            this.setState({ username: res.data.username });
    
            if(this.state.debug)console.log(res.data);
        })
        .then(() => API.singleUser(this.state.username))
        .then((res) =>
        {
            console.log('singleUser: ');
            console.log(res.data);
            this.setState({ singleUserData: res.data });
        })
        .then(() => API.multiUser(this.state.username))
        .then((res) =>
        {
            console.log('multiUser: ');
            console.log(res.data);
            this.setState({ multiUserData: res.data });
        })  
        .catch(err =>
        {
            console.log(err);
            window.location.href = "/denied";
        })
    }

    render = () =>
    {
        return (
            <div className="container-fluid">
                <NavBar 
                    username={this.state.username}
                />
                <h1>Your Scores</h1>
                   
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-4 personal-score-div">
                        <h3 className="personal-score-header">Single Player Games</h3>
                        {this.state.singleUserData.map((singleUser, i) => 
                        {
                            return(
                                <SingleCardScore 
                                    key={i}
                                    id={i + 1}
                                    timestamp1={singleUser.date1}
                                    score1={singleUser.score1}
                                    level1={singleUser.level1}
                                    lines1={singleUser.lines1}
                                />
                            )
                        })}
                    </div>
                    
                    <div className="col-md-4 personal-score-div">
                        <h3 className="personal-score-header">Multi Player Games</h3>
                        {this.state.multiUserData.map((multiUser, i) => 
                        {
                            return(
                                <MultiCardScore
                                    key={i}
                                    id={i + 1}
                                    date={multiUser.date}
                                    score={multiUser.score}
                                    level={multiUser.level}
                                    lines={multiUser.lines}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Scores;
