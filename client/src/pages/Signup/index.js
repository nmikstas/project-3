import React from "react";
import Header from "../../components/Header";
import ErrorBox from "../../components/ErrorBox";
import "./style.css";
import API from "../../utils/API";

class Signup extends React.Component
{
    state =
    {
        name: "",
        password: "",
        confirm: "",
        errorTitle: "",
        errorMessage: "",
        isError: false
    }

    componentDidMount = () =>
    {
        
    }

    nameChange = (event) =>
    {
        this.setState({ name: event.target.value });
    }

    passwordChange = (event) =>
    {
        this.setState({ password: event.target.value });
    }

    confirmChange = (event) =>
    {
        this.setState({ confirm: event.target.value });
    }

    dismissError = () =>
    {
        this.setState({ isError: false });
    }

    submit = (event) =>
    {
        event.preventDefault();

        //Make sure there are no blank fields.
        if (!this.state.name || !this.state.password || !this.state.confirm)
        {
            this.setState(
            { 
                errorTitle: "Blank Fields!",
                errorMessage: "Please fill out all the fields.",
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
                isError: true
            });
            return;
        }

        //Try to create the new user.
        API.createUser({username: this.state.name, password: this.state.password})
            .then(() => { console.log("Created!"); })
            .catch(err => console.log(err));
        
    }

    render = () =>
    {
        return (
            <div className="container-fluid">
                <Header 
                    title="NOT TETRIS-NOT TWITCH"
                />
               
               <div className="row">
                    <div className="col-md-3"></div>
                    <div className="log-in col-md-6">
                        <h2>Sign Up</h2>

                        <div className="info-message">
                            <ErrorBox 
                                title={this.state.errorTitle}
                                message={this.state.errorMessage}
                                showError={this.state.isError}
                                dismissError={this.dismissError}
                            />
                        </div>

                        <form className="login">
                            <label>User Name:</label><br />
                            <input type="text" id="username-input" name="username" onChange={this.nameChange} className="form-control" /><br />

                            <label>Password:</label><br />
                            <input type="password" id="password-input" name="password" onChange={this.passwordChange} className="form-control" /><br />

                            <label>Confirm Password:</label><br />
                            <input type="password" id="password-confirm" name="password" onChange={this.confirmChange} className="form-control" /><br />

                            <button type="submit" className="btn btn-outline-secondary" onClick={this.submit}>Signup</button>

                            <div className="float-right-div">
                                <div className="member-div">Already a member?</div> <a href="/login">Log in here</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;