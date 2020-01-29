import React from "react";
import "./style.css";
import NavBar from "../../components/NavBar";
import LeaderSingleCard from "../../components/LeaderSingleCard";
import LeaderMultiCard from "../../components/LeaderMultiCard";
import API from "../../utils/API";

class Leaderboard extends React.Component
{
    state =
    {
       debug: true,
       single100data: [],
       multi100data: [],
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

        //single score array
        API.single100()
        .then((res) =>
        {
            console.log('single100: ');
            console.log(res.data);

            this.setState({ single100data: res.data });
            
        })
        .catch(err =>
        {
            console.log(err);
            window.location.href = "/denied";
        });

        //leader scores
        API.multi100()
        .then((res) =>
        {
            console.log('multi100: ');
            console.log(res.data);
            
            this.setState({ multi100data: res.data });

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
                <div class="container">
                    <div class="single100">
                        <h3>Single 100</h3>
                        {this.state.single100data.map((single100) => 
                        {
                            console.log(single100)
                            return(
                            <LeaderSingleCard 
                                player1={single100.player1}
                                timestamp1={single100.date1}
                                score1={single100.score1}
                                level1={single100.level1}
                                lines1={single100.lines1}
                            />
                            )
                        })}
                    </div> 
                    <div class="multi100">
                        <h3>Multi 100</h3>
                        {this.state.multi100data.map((multi100) => 
                        {
                            console.log(multi100)
                            return(
                            <LeaderMultiCard 
                                player={multi100.player}
                                date={multi100.date}
                                score={multi100.score}
                                level={multi100.level}
                                lines={multi100.lines}
                            />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Leaderboard;