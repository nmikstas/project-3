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

        //single score array
        API.single100()
        .then((res) =>
        {
            console.log('single100: ');
            console.log(res.data);
            
            for (var i = 0; i<res.data.length;i++){
                let score1 = res.data[i].score1;
                let level1 = res.data[i].level1;
                let lines1 = res.data[i].lines1;
                let player1 = res.data[i].player1;
                let date1 = res.data[i].date1;
                let year = date1.substring(0,4);
                let month = date1.substring(5,7);
                let day = date1.substring(8,10);
                let hour = date1.substring(11,13);
                let minute = date1.substring(14,16);
                let timestamp1 = month + '/' + day + '/' + year;
                console.log(score1);
                console.log(level1);
                console.log(lines1);
                console.log(player1);
                console.log(date1);
                console.log(hour);
                console.log(minute);
                console.log(timestamp1);

                //all the data is 0. I did not see a point in displaying it on a card.
                // let score2 = res.data[i].score2;
                // let level2 = res.data[i].level2;
                // let lines2 = res.data[i].lines2;
                // let player2 = res.data[i].player2;
                // let date2 = res.data[i].date2;
                // console.log(i);
                // console.log(score2);
                // console.log(level2);
                // console.log(lines2);
                // console.log(player2);
                // console.log(date2);

                document.querySelector("h3").innerText = player1;
            }
          
          console.log(res.data);
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

            for(var i=0; i<res.data.length;i++){

                let player = res.data[i].player;
                let score = res.data[i].score;
                let level = res.data[i].level;
                let lines = res.data[i].lines;
                let dateStamp = res.data[i].date;
                console.log(player);
                console.log(score);
                console.log(level);
                console.log(lines);
                console.log(dateStamp);
            }
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
                <h3></h3>
            </div>
        )
    }
}

export default Leaderboard;