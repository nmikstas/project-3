import React from "react";
import "./style.css";
import NavBar from "../../components/NavBar";
import LevelCard from "../../components/LevelCard";
import ImportUsers from "../../components/ImportUsers";
import API from "../../utils/API";

class CreateForum extends React.Component
{
    state =
    {
        levelArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        interferenceArr: ["0-0", "0-1", "0-2", "0-3", "0-4", "0-5", "0-6", "0-7", "0-8", "0-9", "0-10"],

        interferenceArr2: [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1],

        flipArr: ["selected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container"],
        flipArr2: ["selected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container"],

        startingLevel: 0,
        interferenceLevel: 0,

        firstPageComplete: false,

        forumName: "",

        flipClassName: "notSelected-img-container",

        userListArr: [],

        forumMembersArr: [],

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

        API.allusers()
        .then((res) =>
        {
            this.setState({ userListArr: res.data });
            console.log(this.state.userListArr);
        })
        .catch(err => console.log(err));
    }

    selectLevel = (id) => 
    {
        //console.log(id);

        let flipArr = ["notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container"];
        flipArr[id] = "selected-img-container";

        this.setState(
            {
                flipArr: flipArr,
                startingLevel: id,
            }
        )
    }

    selectInterference = (id) => 
    {
        //console.log(id);

        let index = this.state.interferenceArr.indexOf(id);
        //console.log(index / 10);

        let flipArr2 = ["notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container", "notSelected-img-container"];
        flipArr2[index] = "selected-img-container";

        this.setState(
            {
                flipArr2: flipArr2,
                interferenceLevel: (index / 10),
            }
        )
    }

    forumNameUpdate = (event) =>
    {
        this.setState({ forumName: event.target.value });
    }

    nextButton = () =>
    {
        this.setState({ firstPageComplete: true });
        console.log("Forum Name: " + this.state.forumName + "\n" + "Starting Level: " + this.state.startingLevel + "\n" + "Interference Level: " + this.state.interferenceLevel);
    }

    backButton = () =>
    {
        this.setState({ firstPageComplete: false });
        console.log("Forum Name: " + this.state.forumName + "\n" + "Starting Level: " + this.state.startingLevel + "\n" + "Interference Level: " + this.state.interferenceLevel);
    }

    addSpectator = (event) =>
    {
        event.preventDefault();
        let username = event.target.dataset.user;
        //let username = event.target.dataset.username;
        console.log(username);
    }

    addModerator = (event) =>
    {
        event.preventDefault();
        let username = event.target.dataset.user;
        //let username = event.target.dataset.username;
        console.log(username);
    }

    addVersus = (event) =>
    {
        event.preventDefault();
        let username = event.target.dataset.user;
        //let username = event.target.dataset.username;
        console.log(username);
    }

    render = () =>
    {
        if(!this.state.firstPageComplete)
        {
            //Render first page.
            return (
                <div className="container-fluid">
                    <NavBar 
                        username={this.state.username}
                    />
                    <h1>Create Forum</h1>
                    <div className="row settings-body">
                        <div className="col-md-2"></div>

                        <div className="col-md-8 col-div">
                            <form className="forumName">
                                <label htmlFor="forumName" className="form-label">Forum Name:</label><br />    
                                <input type="forumName" id="forumName-input" name="forumName"
                                    value={this.state.forumName} onChange={this.forumNameUpdate} className="form-control" />
                                <br />
                                <label htmlFor="startingLevel" className="form-label">Select Starting Level:</label><br />    
                                <div>
                                    {this.state.levelArr.map((levels, i) => (
                                        <LevelCard
                                            LevelValue={levels}
                                            id={levels}
                                            key={levels}
                                            selected={this.state.flipArr[i]}
                                            selectLevels={this.selectLevel}
                                        />
                                    ))}
                                </div>
                                <br />
                                <label htmlFor="interferenceLevel" className="form-label">Select Interference Level:</label><br />    
                                <div>
                                    {this.state.interferenceArr.map((levels, i) => (
                                        <LevelCard
                                            LevelValue={this.state.interferenceArr2[i]}
                                            id={levels}
                                            key={levels}
                                            selected={this.state.flipArr2[i]}
                                            selectLevels={this.selectInterference}
                                        />
                                    ))}
                                </div>
                                <br />
                                <button type="submit" className="btn btn-outline-secondary" onClick={this.nextButton}>Next</button>
                            </form>
                        </div>
                    </div>

                </div>
            )
        }
        else
        {
            return (
                //Second page here.
                <div className="container-fluid">
                    <NavBar 
                        username={this.state.username}
                    />
                    <h1>Create Forum</h1>
                    <div className="row settings-body">
                        <div className="col-md-2"></div>

                        <div className="col-md-8 col-div">
                            <div className="row">
                                <div className="col-md-6">
                                    <form className="forumName">
                                        <label htmlFor="forumName" className="form-label">Add Users:</label><br />
                                        <div id="userList" className="border rounded bg-light" style={{height: 180}}>
                                            {this.state.userListArr.map((users, i) => (
                                            <ImportUsers 
                                                username={this.state.userListArr[i].username}
                                                id={this.state.userListArr[i].username}
                                                key={this.state.userListArr[i].username}
                                                addSpectator={this.addSpectator}
                                                addModerator={this.addModerator}
                                                addVersus={this.addModerator}
                                            />
                                            ))}
                                        </div>
                                        <br />
                                        <button type="submit" className="btn btn-outline-info">Refresh Users</button>
                                    </form>
                                </div>
                                <div className="col-md-6">
                                    <form className="forumName">
                                        <label htmlFor="forumName" className="form-label">Spectators:</label><br />
                                        <div id="userList" className="border rounded bg-light" style={{height: 180}}></div>
                                    </form>
                                    <br />
                                    <form className="forumName">
                                        <label htmlFor="forumName" className="form-label">Versus Player:</label><br />
                                        <div id="userList" className="border rounded bg-light" style={{height: 35}}></div>
                                    </form>
                                </div>
                            </div>
                            <br />
                            <button type="submit" className="btn btn-outline-secondary" onClick={this.backButton}>Back</button>
                        </div>
                    </div>
                </div>
            )

        }  
    }
}

export default CreateForum;