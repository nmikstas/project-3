import React from "react";
import Header from "../../components/Header";
import ErrorBox from "../../components/ErrorBox";
import "./style.css";
import API from "../../utils/API";

class Login extends React.Component
{
    state =
    {
        name: "",
        password: "",
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

    dismissError = () =>
    {
        this.setState({ isError: false });
    }

    submit = (event) =>
    {
        event.preventDefault();

        if (!this.state.name || !this.state.password)
        {
            this.setState(
            { 
                errorTitle: "Blank Fields!",
                errorMessage: "Please fill out all the fields.",
                isError: true
            });
            return;
        }
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
                        <h2>Log In</h2>

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

                            <button type="submit" className="btn btn-outline-secondary" onClick={this.submit}>Login</button>

                            <div className="float-right-div">
                                <div className="member-div">Not a member?</div> <a href="/signup">Sign up here</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;