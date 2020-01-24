import React from "react";
import "./style.css";
import NavBar from "../../components/NavBar";
import API from "../../utils/API";
import singleImg from './img/single.png';

class Home extends React.Component
{
    state =
    {
       debug:     true,
       username:  "N/A",
       myScore:   0,
       myLevel:   0,
       myLines:   0,
       topPlayer: "N/A",
       topScore:  0,
       topLevel:  0,
       topLines:  0,
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

            this.setState(
            { 
                username: res.data.username,
                myScore: res.data.highScore,
                myLevel: res.data.level,
                myLines: res.data.lines
            });

            if(this.state.debug)console.log(res.data);
        })
        .then(() =>
        {
            return API.single100();
        })
        .then((res) =>
        {
            if(res.data.length)
            {
                this.setState(
                {
                    topPlayer: res.data[0].player1,
                    topScore:  res.data[0].score1,
                    topLevel:  res.data[0].level1,
                    topLines:  res.data[0].lines1,
                });
            }
        })
        .catch(err =>
        {
            console.log(err);
            window.location.href = "/denied";
        });
    }

    singleForum = () =>
    {
        window.location.href = "singlePlayerForum.html";
    }

    render = () =>
    {
        return (
            <div className="container-fluid">
                <NavBar 
                    username={this.state.username}
                />
                <h1>Home</h1>
                <div className="row home-body">
                    <div className="col-md-3">
                        <div className="single-col mb-3">
                            <div className="single-div" onClick={this.singleForum}>
                                <img className="img-fluid forum-img" src={singleImg} />
                            </div>
                            <div className="mt-4 score-div">
                                <div className="score-header">Your Top Score</div>
                                <div className="row no-gutters">
                                    <div className="col-md-6 score-text">Score: </div>
                                    <div className="col-md-6 data-text">{this.state.myScore}</div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-md-6 score-text">Level: </div>
                                    <div className="col-md-6 data-text">{this.state.myLevel}</div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-md-6 score-text">Lines: </div>
                                    <div className="col-md-6 data-text">{this.state.myLines}</div>
                                </div>    
                            </div>

                            <div className="mt-4 score-div">
                                <div className="score-header">High Score</div>
                                <div className="row no-gutters">
                                    <div className="col-md-6 score-text">Player: </div>
                                    <div className="col-md-6 data-text">{this.state.topPlayer}</div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-md-6 score-text">Score: </div>
                                    <div className="col-md-6 data-text">{this.state.topScore}</div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-md-6 score-text">Level: </div>
                                    <div className="col-md-6 data-text">{this.state.topLevel}</div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-md-6 score-text">Lines: </div>
                                    <div className="col-md-6 data-text">{this.state.topLines}</div>
                                </div> 
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="mult-col">
                            <div className="forum-header">Multiplayer Forums</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;