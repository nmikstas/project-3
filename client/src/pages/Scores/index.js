import React from "react";
import "./style.css";
import NavBar from "../../components/NavBar";
import API from "../../utils/API";

class Scores extends React.Component
{
    state =
    {
       debug: true,
       username: "",

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
            // window.location.href = "/denied";
        });

        //single score array
        API.singleUser(this.state.username)
        .then((res) =>
        {
            console.log('singleUser: ');
            console.log(res);
        })
        .catch(err =>
        {
            console.log(err);
            // window.location.href = "/denied";
        });

        //leader scores
        API.multiUser(this.state.user)
        .then((res) =>
        {
          console.log(res.data);
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
                <h1>Scores</h1>
                
            </div>
        )
    }
}

export default Scores;