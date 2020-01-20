import React from "react";
import NavBar from "../../components/NavBar";
import API from "../../utils/API";
import "./style.css";

class UserSettings extends React.Component
{
    //Game input values. Matches the corresponding game requests.
    static get IN_ROTATE_CW()  { return 1 };
    static get IN_ROTATE_CCW() { return 2 };
    static get IN_LEFT()       { return 3 };
    static get IN_RIGHT()      { return 4 };
    static get IN_DOWN()       { return 5 };
    static get IN_PAUSE()      { return 6 };

    //Input types.
    static get IT_KEYBOARD()        { return 0 };
    static get IT_GAMEPAD_ANALOG()  { return 1 };
    static get IT_GAMEPAD_DIGITAL() { return 2 };
    static get IT_GAMEPAD_DPAD()    { return 3 };
    
    state =
    {
       debug: true,
       username: "",
       password: "",
       confirm: "",

       downBtn: 0,
       downIndex: 0,
       downType: 0,
       downText: "",
       downClassName: "ready-class"
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

    passwordChange = (event) =>
    {
        this.setState({ password: event.target.value });
    }

    confirmChange = (event) =>
    {
        this.setState({ confirm: event.target.value });
    }

    submit = (event) =>
    {
        event.preventDefault();
    }

    render = () =>
    {
        return (
            <div className="container-fluid">
                <NavBar 
                    username={this.state.username}
                />
                <h1>User Settings</h1>
                <div className="row settings-body">
                    <div className="col-md-2"></div>

                    <div className="col-md-4 col-div">
                        <h4 className="user-headers text-center">Change Password</h4>
                        <form className="password">
                            <label htmlFor="password" className="form-label">New Password:</label><br />    
                            <input type="password" id="password-input" name="password"
                                value={this.state.password} onChange={this.passwordChange} className="form-control" /><br />
                            <label htmlFor="confirm" className="form-label">Confirm Password:</label><br />
                            <input type="password" id="password-confirm" name="confirm"
                                value={this.state.confirm} onChange={this.confirmChange} className="form-control" /><br />
                            <button type="submit" className="btn btn-outline-secondary" onClick={this.submit}>Change Password</button>
                        </form>
                    </div>

                    <div className="col-md-4 col-div">
                        <h4 className="user-headers text-center">Game Input</h4>
                        <div>
                            <div className="row m-2">
                                <span className="col-md-6 type-text">
                                    Down: 
                                </span>
                                <span>

                                </span>
                                
                                <div className={this.state.downClassName}>
                                    Ready
                                </div>
                                <div className="col-md-5 text-right">
                                    <button className="btn btn-outline-secondary">Change</button>
                                </div>
                            </div>

                            <div className="row m-2">
                                <span className="col-md-6">
                                    Left: 
                                </span>
                                <span>

                                </span>
                                <div className="col-md-6  text-right">
                                    <button className="btn btn-outline-secondary">Change</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSettings;