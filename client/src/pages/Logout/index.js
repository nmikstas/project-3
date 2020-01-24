import React from "react";
import API from "../../utils/API";

class Logout extends React.Component
{
    state =
    {
       debug: true
    }

    componentDidMount = () =>
    {
        //Check if the user is logged in or not.
        API.logout()
        .then((res) =>
        {
            if(this.state.debug)console.log(res.data);
            window.location.href = "/login";
        })
        .catch(err =>
        {
            console.log(err);
            window.location.href = "/login";
        });
    }

    render = () =>
    {
        return (
            <div className="container-fluid">
                <h1 className="mt-5">Logging User Out...</h1>
            </div>
        )
    }
}

export default Logout;