import React from "react";
import "./style.css";
import NavBar from "../../components/NavBar";
import ForumDiv from "../../components/ForumDiv";
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

       ownedForums:  [],
       playerForums: [],
       otherForums:  [],

       DataTimer: null
    }

    enterForum = (forumId) =>
    {
        API.setForum({ username: this.state.username, forumId: forumId })
        .then(res =>
        {
            window.location.href = "multiPlayerForum.html";
        })
        .catch(err => { console.log(err) });
    }

    deleteOwned = (forumId) =>
    {
        API.deleteOwned({ username: this.state.username, forumId: forumId })
        .then(res =>
        {
            let ownedForums = [];

            for(let i = 0; i < this.state.ownedForums.length; i++)
            {
                if(this.state.ownedForums[i]._id !== forumId)
                {
                    ownedForums.push(this.state.ownedForums[i]);
                }
            }

            this.setState(
            {
                ownedForums: ownedForums
            });
        })
        .catch(err => { console.log(err) });
    }

    deletePlayer = (forumId) =>
    {
        API.deletePlayer2({ username: this.state.username, forumId: forumId })
        .then(res =>
        {
            let playerForums = [];

            for(let i = 0; i < this.state.playerForums.length; i++)
            {
                if(this.state.playerForums[i]._id !== forumId)
                {
                    playerForums.push(this.state.playerForums[i]);
                }
            }

            this.setState(
            {
                playerForums: playerForums
            });
        })
        .catch(err => { console.log(err) });
    }

    deleteSpectator = (forumId) =>
    {
        API.deleteSpectator({ username: this.state.username, forumId: forumId })
        .then(res =>
        {
            let otherForums = [];

            for(let i = 0; i < this.state.otherForums.length; i++)
            {
                if(this.state.otherForums[i]._id !== forumId)
                {
                    otherForums.push(this.state.otherForums[i]);
                }
            }

            this.setState(
            {
                otherForums: otherForums
            });
        })
        .catch(err => { console.log(err) });
    }

    //Get user's forum data.
    getForumData = async () =>
    {
        const res = await API.getUser(this.state.username);
        this.setState(
        {
            ownedForums:  res.data.ownedForums  ? res.data.ownedForums.reverse()  : [],
            playerForums: res.data.playerForums ? res.data.playerForums.reverse() : [],
            otherForums:  res.data.otherForums  ? res.data.otherForums.reverse()  : []
        });
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
        //Get the top single player scores
        .then(() =>
        {
            return API.single100();
        })
        .then((res) =>
        {
            if(res.data.length)
            {
                //Display the top single player score.
                this.setState(
                {
                    topPlayer: res.data[0].player1,
                    topScore:  res.data[0].score1,
                    topLevel:  res.data[0].level1,
                    topLines:  res.data[0].lines1,
                });
            }
        })
        .then(() =>
        {
            this.getForumData();
        })
        .catch(err =>
        {
            console.log(err);
            window.location.href = "/denied";
        });

        let dataTimer = setInterval(this.getForumData, 3000);

        this.setState({ dataTimer: dataTimer });
    }

    componentWillUnmount = () =>
    {
        clearInterval(this.state.dataTimer);
    }

    singleForum = () =>
    {
        window.location.href = "singlePlayerForum.html";
    }

    render = () =>
    {
        function comma(x) {
            return x.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
        }

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
                                <img className="img-fluid forum-img" src={singleImg} alt="Single Player Forum" />
                            </div>
                            <div className="mt-4 score-div">
                                <div className="score-header">Your Top Score</div>
                                <div className="row no-gutters">
                                    {/* <div className="col-md-6 score-text">Score: </div> */}
                                    <div className="col-md-12 data-text score">{comma(this.state.myScore)}</div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-md-3"></div>
                                    <img src={require("./img/level.png")} class="levelImg" alt="level"/>
                                    <div className="col-md-3 score-text">Level: </div>
                                    <div className="col-md-1 data-text">{this.state.myLevel}</div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-md-3"></div>
                                    <img src={require("./img/lines.png")} class="linesImg" alt="lines"/>
                                    <div className="col-md-3 score-text">Lines: </div>
                                    <div className="col-md-1 data-text">{this.state.myLines}</div>
                                </div>    
                            </div>

                            <div className="mt-4 score-div">
                                <div className="score-header">High Score</div>
                                <div className="row no-gutters">
                                    <div className="col-md-12 data-text score">{comma(this.state.topScore)}</div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-md-12 data-text score">{this.state.topPlayer}</div>
                                </div>


                                <div className="row no-gutters">
                                    <div className="col-md-3"></div>
                                    <img src={require("./img/level.png")} class="levelImg" alt="level"/>
                                    <div className="col-md-3 score-text">Level: </div>
                                    <div className="col-md-1 data-text">{this.state.topLevel}</div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-md-3"></div>
                                    <img src={require("./img/lines.png")} class="linesImg" alt="lines"/>
                                    <div className="col-md-3 score-text">Lines: </div>
                                    <div className="col-md-1 data-text">{this.state.topLines}</div>
                                </div> 
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="mult-col">
                            <div className="forum-header border-bottom mx-3">Multiplayer Forums</div>

                            <div className="row ">
                                <div className="col-md-4">
                                    <div className="forum-types my-2 border-bottom">Owner</div>
                                    {this.state.ownedForums.map((forum, i) =>
                                    (
                                        <ForumDiv
                                            key={i}
                                            forumId={forum._id}
                                            enter={this.enterForum}
                                            delete={this.deleteOwned}
                                            forumName={forum.forumName}
                                            created={forum.date}
                                            alt={"Player 2: "}
                                            altValue={forum.player2}
                                            addIcon={false}
                                            level={forum.startLevel}
                                            interference={forum.interference}
                                        />
                                    ))}
                                </div>
                                <div className="col-md-4">
                                    <div className="forum-types my-2 border-bottom">Player 2</div>
                                    {this.state.playerForums.map((forum, i) =>
                                    (
                                        <ForumDiv
                                            key={i}
                                            forumId={forum._id}
                                            enter={this.enterForum}
                                            delete={this.deletePlayer}
                                            forumName={forum.forumName}
                                            created={forum.date}
                                            alt={"Owner: "}
                                            altValue={forum.owner}
                                            addIcon={false}
                                            level={forum.startLevel}
                                            interference={forum.interference}
                                        />
                                    ))}
                                </div>
                                <div className="col-md-4">
                                    <div className="forum-types my-2 border-bottom">Spectator</div>
                                    {this.state.otherForums.map((forum, i) =>
                                    {
                                        let isModerator = false;
                                        for(let i = 0; i < forum.spectators.length; i++)
                                        {
                                            if(forum.spectators[i].username === this.state.username)
                                            {
                                                isModerator = forum.spectators[i].isModerator
                                            }
                                        }
                                        return (
                                            <ForumDiv
                                                key={i}
                                                forumId={forum._id}
                                                enter={this.enterForum}
                                                delete={this.deleteSpectator}
                                                forumName={forum.forumName}
                                                isModerator={isModerator}
                                                created={forum.date}
                                                alt={"Roll: "}
                                                altValue={isModerator ? "Moderator" : "Spectator"}
                                                addIcon={true}
                                                iconClass={isModerator ? "addModerator" : "addSpectator"}
                                                iconText={isModerator ? "M" : "S"}
                                                level={forum.startLevel}
                                                interference={forum.interference}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;