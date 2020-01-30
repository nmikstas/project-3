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

                //single score array
                API.singleUser(this.state.username)
                .then((res) =>
                {
                    console.log('singleUser: ');
                    console.log(res.data);
                    this.setState({ singleUserData: res.data });
                })
                .catch(err =>
                {
                    console.log(err);
                    window.location.href = "/denied";
                });

                //leader scores
                API.multiUser(this.state.username)
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
                });

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
                <h1>Scores for {this.state.username}</h1>
                <div class="container">
                    <div class="single100">
                        <h3 class="scoreHeader">Single 100</h3>
                        {this.state.singleUserData.map((singleUser) => 
                        {
                            console.log(singleUser)
                            return(
                            <SingleCardScore 
                                player1={singleUser.player1}
                                timestamp1={singleUser.date1}
                                score1={singleUser.score1}
                                level1={singleUser.level1}
                                lines1={singleUser.lines1}
                            />
                            )
                        })}
                    </div> 
                    <div class="multiUser">
                        <h3 class="scoreHeader">Multi User</h3>
                        {this.state.multiUserData.map((multiUser) => 
                        {
                            console.log(multiUser)
                            return(
                            <MultiCardScore 
                                player={multiUser.player}
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
