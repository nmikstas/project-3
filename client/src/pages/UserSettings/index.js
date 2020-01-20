import React from "react";
import NavBar from "../../components/NavBar";
import API from "../../utils/API";
import ErrorBox from "../../components/ErrorBox";
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
        downText: "Down Input",
        downClassName: "ready-class",

        leftBtn: 0,
        leftIndex: 0,
        leftType: 0,
        leftText: "Left Input",
        leftClassName: "ready-class",

        rightBtn: 0,
        rightIndex: 0,
        rightType: 0,
        rightText: "Right Input",
        rightClassName: "ready-class",

        flipCWBtn: 0,
        flipCWIndex: 0,
        flipCWType: 0,
        flipCWText: "Rotate CW Input",
        flipCWClassName: "ready-class",

        flipCCWBtn: 0,
        flipCCWIndex: 0,
        flipCCWType: 0,
        flipCCWText: "Rotate CCW Input",
        flipCCWClassName: "ready-class",

        pauseBtn: 0,
        pauseIndex: 0,
        pauseType: 0,
        pauseText: "Pause Input",
        pauseClassName: "ready-class",

        errorTitle: "",
        errorMessage: "",
        errorType: "alert-danger",
        isError: false
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

            if(this.state.debug)console.log(res.data);

            //Set the state with the user data.
            this.setState(
            {
                username: res.data.username,

                downBtn:   res.data.downBtn,
                downIndex: res.data.downIndex,
                downType:  res.data.downType,

                leftBtn:   res.data.leftBtn,
                leftIndex: res.data.leftIndex,
                leftType:  res.data.leftType,

                rightBtn:   res.data.rightBtn,
                rightIndex: res.data.rightIndex,
                rightType:  res.data.rightType,

                flipCWBtn:   res.data.flipCWBtn,
                flipCWIndex: res.data.flipCWIndex,
                flipCWType:  res.data.flipCWType,

                flipCCWBtn:   res.data.flipCCWBtn,
                flipCCWIndex: res.data.flipCCWIndex,
                flipCCWType:  res.data.flipCCWType,

                pauseBtn:   res.data.pauseBtn,
                pauseIndex: res.data.pauseIndex,
                pauseType:  res.data.pauseType
            });

            this.setState(
            {
                downText:    this.inputText(this.state.downBtn,    this.state.downType),
                leftText:    this.inputText(this.state.leftBtn,    this.state.leftType),
                rightText:   this.inputText(this.state.rightBtn,   this.state.rightType),
                flipCWText:  this.inputText(this.state.flipCWBtn,  this.state.flipCWType),
                flipCCWText: this.inputText(this.state.flipCCWBtn, this.state.flipCCWType),
                pauseText:   this.inputText(this.state.pauseBtn,   this.state.pauseType)
            });
        })
        .catch(err =>
        {
            console.log(err);
            window.location.href = "/denied";
        });
    }

    dismissError = () =>
    {
        this.setState({ isError: false });
    }

    inputText = (btn, type) =>
    {
        let typeText;

        switch(type)
        {
            case UserSettings.IT_KEYBOARD:
                typeText="KEY ";
                break;
            case UserSettings.IT_GAMEPAD_ANALOG:
                typeText="STICK ";
                break;
            case UserSettings.IT_GAMEPAD_DIGITAL:
                typeText="BUTTON ";
                break;
            default:
                typeText="DPAD ";
                break;
        }

        return typeText + btn;
    }

    passwordChange = (event) =>
    {
        this.setState({ password: event.target.value });
    }

    confirmChange = (event) =>
    {
        this.setState({ confirm: event.target.value });
    }

    changePassword = (event) =>
    {
        event.preventDefault();

        //Clear out any old messages.
        this.setState(
        { 
            errorTitle: "",
            errorMessage: "",
            errorType: "alert-danger",
            isError: false
        });

        //Make sure there are no blank fields.
        if (!this.state.password || !this.state.confirm)
        {
            this.setState(
            { 
                errorTitle: "Blank Fields!",
                errorMessage: "Please fill out all the fields.",
                errorType: "alert-danger",
                isError: true
            });
            return;
        }

        //Make sure the passwords match.
        if(this.state.password !== this.state.confirm)
        {
            this.setState(
            { 
                errorTitle: "Password Mismatch!",
                errorMessage: "Please verify your password.",
                errorType: "alert-danger",
                isError: true
            });
            return;
        }

        //Try to create the new user.
        API.password({username: this.state.username, password: this.state.password})
        .then(() =>
        { 
            this.setState(
            { 
                password: "",
                confirm: "",
                errorTitle: "Password Changed!",
                errorMessage: "Password change was successful.",
                errorType: "alert-success",
                isError: true
            });
        })
        .catch(err => console.log(err)); 
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

                        <div className="info-message">
                            <ErrorBox 
                                title={this.state.errorTitle}
                                type={this.state.errorType}
                                message={this.state.errorMessage}
                                showError={this.state.isError}
                                dismissError={this.dismissError}
                            />
                        </div>
                        
                        <form className="password">
                            <label htmlFor="password" className="form-label">New Password:</label><br />    
                            <input type="password" id="password-input" name="password"
                                value={this.state.password} onChange={this.passwordChange} className="form-control" /><br />
                            <label htmlFor="confirm" className="form-label">Confirm Password:</label><br />
                            <input type="password" id="password-confirm" name="confirm"
                                value={this.state.confirm} onChange={this.confirmChange} className="form-control" /><br />
                            <button type="submit" className="btn btn-outline-secondary" onClick={this.changePassword}>Change Password</button>
                        </form>
                    </div>

                    <div className="col-md-4 col-div">
                        <h4 className="user-headers text-center">Game Input</h4>
                        <div>
                            <div className="row ml-2 mt-2 mr-2 mb-3">
                                <div className="col-md-6">
                                    <span className="type-text">
                                        Down: 
                                    </span>
                                    <span className="input-text">
                                        {this.state.downText}
                                    </span>
                                    <div className={this.state.downClassName}>
                                        Ready
                                    </div>
                                </div>
                                <div className="col-md-6 text-right">
                                    <button className="btn btn-outline-info">Change</button>
                                </div>
                            </div>

                            <div className="row ml-2 mt-2 mr-2 mb-3">
                                <div className="col-md-6">
                                    <span className="type-text">
                                        Left: 
                                    </span>
                                    <span className="input-text">
                                        {this.state.leftText}
                                    </span>
                                    <div className={this.state.leftClassName}>
                                        Ready
                                    </div>
                                </div>
                                <div className="col-md-6 text-right">
                                    <button className="btn btn-outline-info">Change</button>
                                </div>
                            </div>

                            <div className="row ml-2 mt-2 mr-2 mb-3">
                                <div className="col-md-6">
                                    <span className="type-text">
                                        Right: 
                                    </span>
                                    <span className="input-text">
                                        {this.state.rightText}
                                    </span>
                                    <div className={this.state.rightClassName}>
                                        Ready
                                    </div>
                                </div>
                                <div className="col-md-6 text-right">
                                    <button className="btn btn-outline-info">Change</button>
                                </div>
                            </div>

                            <div className="row ml-2 mt-2 mr-2 mb-3">
                                <div className="col-md-6">
                                    <span className="type-text">
                                        Rotate CW: 
                                    </span>
                                    <span className="input-text">
                                        {this.state.flipCWText}
                                    </span>
                                    <div className={this.state.flipCWClassName}>
                                        Ready
                                    </div>
                                </div>
                                <div className="col-md-6 text-right">
                                    <button className="btn btn-outline-info">Change</button>
                                </div>
                            </div>

                            <div className="row ml-2 mt-2 mr-2 mb-3">
                                <div className="col-md-6">
                                    <span className="type-text">
                                        Rotate CCW: 
                                    </span>
                                    <span className="input-text">
                                        {this.state.flipCCWText}
                                    </span>
                                    <div className={this.state.flipCCWClassName}>
                                        Ready
                                    </div>
                                </div>
                                <div className="col-md-6 text-right">
                                    <button className="btn btn-outline-info">Change</button>
                                </div>
                            </div>

                            <div className="row ml-2 mt-2 mr-2 mb-3">
                                <div className="col-md-6">
                                    <span className="type-text">
                                        Pause: 
                                    </span>
                                    <span className="input-text">
                                        {this.state.pauseText}
                                    </span>
                                    <div className={this.state.pauseClassName}>
                                        Ready
                                    </div>
                                </div>
                                <div className="col-md-6 text-right">
                                    <button className="btn btn-outline-info">Change</button>
                                </div>
                            </div>

                            <div className="text-right mr-4">
                                <button className="btn btn-outline-secondary">Save Changes to Database</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSettings;