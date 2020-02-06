import React from "react";
import "./style.css";
import NavBar from "../../components/NavBar";
import SingleCardScore from "../../components/SingleCardScore";
import MultiCardScore from "../../components/MultiCardScore";
import API from "../../utils/API";
import {format} from 'date-fns';

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
        API.verify().then((res) =>
        {
            //If not, boot 'em out!
            if(res.data.notLoggedIn)
            {
                window.location.href = "/denied";
            }

            this.setState({ username: res.data.username });
    
            if(this.state.debug)console.log(res.data);
        })
        .then(() => API.singleUser(this.state.username))
        .then((res) =>
        {
            console.log('singleUser: ');
            console.log(res.data);
            this.setState({ singleUserData: res.data });
        })
        .then(() => API.multiUser(this.state.username))
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
        })
    }

    render = () =>
    {
        function comma(x) {
            return x.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
        }
        return (
            <div className="container-fluid">
                <NavBar 
                    username={this.state.username}
                />
                <h1>Your Scores</h1>
                   
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-4 personal-score-div">
                        <h3 className="personal-score-header">Single Player Games</h3>
                        {this.state.singleUserData.map((singleUser, i) => 
                        {
                            function changeColor(i){
                                switch(i){
                                    case 1:
                                    case 26:
                                    case 51:
                                    case 76:
                                        return 'rgba(255, 0, 0, .6)';
                                    case 2:
                                    case 27:
                                    case 52:
                                    case 77:
                                        return  'rgba(255, 128, 0, .6)';
                                    case 3:
                                    case 28:
                                    case 53:
                                    case 78:
                                        return 'rgba(255, 255, 0, .6)';
                                    case 4:
                                    case 29:
                                    case 54:
                                    case 79:
                                        return  'rgba(128, 255, 0, .6)';
                                    case 5:
                                    case 30:
                                    case 55:
                                    case 80:
                                        return 'rgba(0, 255, 255, .6)';
                                    case 6:
                                    case 31:
                                    case 56:
                                    case 81:
                                        return  'rgba(0, 0, 255, .6)';
                                    case 7:
                                    case 32:
                                    case 57:
                                    case 82:
                                        return 'rgba(127, 0, 255, .6)';
                                    case 8:
                                    case 33:
                                    case 58:
                                    case 83:
                                        return  'rgba(255, 0, 255, .6)';
                                    case 9:
                                    case 34:
                                    case 59:
                                    case 84:
                                        return 'rgba(255, 0, 127, .6)';
                                    case 10:
                                    case 35:
                                    case 60:
                                    case 85:
                                        return  'rgba(128, 128, 128, .6)';
                                    case 11:
                                    case 36:
                                    case 61:
                                    case 86:
                                        return 'rgba(153, 0, 0, .6)';
                                    case 12:
                                    case 37: 
                                    case 62:
                                    case 87:
                                        return  'rgba(153, 76, 0, .6)';
                                    case 13:
                                    case 38:
                                    case 63: 
                                    case 88:
                                        return 'rgba(153, 153, 0, .6)';
                                    case 14: 
                                    case 39: 
                                    case 64:
                                    case 89:
                                        return  'rgba(0, 153, 153, .6)';
                                    case 15:
                                    case 40:
                                    case 65:
                                    case 90:
                                        return 'rgba(0, 76, 153, .6)';
                                    case 16:
                                    case 41:
                                    case 66:
                                    case 91:
                                        return  'rgba(0, 0, 153, .6)';
                                    case 17:
                                    case 42:
                                    case 67:
                                    case 92:
                                        return 'rgba(76, 0, 153, .6)';
                                    case 18:
                                    case 43:
                                    case 68:
                                    case 93:
                                        return  'rgba(153, 0, 153, .6)';
                                    case 19:
                                    case 44:
                                    case 69:
                                    case 94:
                                        return 'rgba(153, 0, 76, .6)';
                                    case 20:
                                    case 45:
                                    case 70:
                                    case 95:
                                        return  'rgba(64, 64, 64, .6)';
                                    case 21:
                                    case 46:
                                    case 71:
                                    case 96:
                                        return  'rgba(255, 153, 153, .6)';
                                    case 22:
                                    case 47:
                                    case 72:
                                    case 97:
                                        return  'rgba(255, 255, 153, .6)';
                                    case 23:
                                    case 48:
                                    case 73:
                                    case 98:  
                                        return  'rgba(102, 178, 255, .6)';
                                    case 24:
                                    case 49:
                                    case 74:
                                    case 99:
                                        return  'rgba(204, 153, 255, .6)';
                                    case 25:
                                    case 50:
                                    case 75:
                                    case 100:
                                        return  'rgba(255, 153, 204, .6)';
                                    default:
                                        return  'rgba(0, 0, 0, .6)';
                                }
                            }
                            return(
                                <SingleCardScore 
                                    key={i}
                                    color={{backgroundColor:changeColor(i+1)}}
                                    id={i + 1}
                                    username={this.state.username}
                                    timestamp1={format(new Date(singleUser.date1),'MM/d/yyyy - kk:mm') }
                                    score1={comma(singleUser.score1)}
                                    level1={singleUser.level1}
                                    lines1={singleUser.lines1}
                                />
                            )
                        })}
                    </div>
                    
                    <div className="col-md-4 personal-score-div">
                        <h3 className="personal-score-header">Multi Player Games</h3>
                        {this.state.multiUserData.map((multiUser, i) => 
                        {
                            function changeColor(i){
                                switch(i){
                                    case 1:
                                    case 26:
                                    case 51:
                                    case 76:
                                        return 'rgba(255, 0, 0, .6)';
                                    case 2:
                                    case 27:
                                    case 52:
                                    case 77:
                                        return  'rgba(255, 128, 0, .6)';
                                    case 3:
                                    case 28:
                                    case 53:
                                    case 78:
                                        return 'rgba(255, 255, 0, .6)';
                                    case 4:
                                    case 29:
                                    case 54:
                                    case 79:
                                        return  'rgba(128, 255, 0, .6)';
                                    case 5:
                                    case 30:
                                    case 55:
                                    case 80:
                                        return 'rgba(0, 255, 255, .6)';
                                    case 6:
                                    case 31:
                                    case 56:
                                    case 81:
                                        return  'rgba(0, 0, 255, .6)';
                                    case 7:
                                    case 32:
                                    case 57:
                                    case 82:
                                        return 'rgba(127, 0, 255, .6)';
                                    case 8:
                                    case 33:
                                    case 58:
                                    case 83:
                                        return  'rgba(255, 0, 255, .6)';
                                    case 9:
                                    case 34:
                                    case 59:
                                    case 84:
                                        return 'rgba(255, 0, 127, .6)';
                                    case 10:
                                    case 35:
                                    case 60:
                                    case 85:
                                        return  'rgba(128, 128, 128, .6)';
                                    case 11:
                                    case 36:
                                    case 61:
                                    case 86:
                                        return 'rgba(153, 0, 0, .6)';
                                    case 12:
                                    case 37: 
                                    case 62:
                                    case 87:
                                        return  'rgba(153, 76, 0, .6)';
                                    case 13:
                                    case 38:
                                    case 63: 
                                    case 88:
                                        return 'rgba(153, 153, 0, .6)';
                                    case 14: 
                                    case 39: 
                                    case 64:
                                    case 89:
                                        return  'rgba(0, 153, 153, .6)';
                                    case 15:
                                    case 40:
                                    case 65:
                                    case 90:
                                        return 'rgba(0, 76, 153, .6)';
                                    case 16:
                                    case 41:
                                    case 66:
                                    case 91:
                                        return  'rgba(0, 0, 153, .6)';
                                    case 17:
                                    case 42:
                                    case 67:
                                    case 92:
                                        return 'rgba(76, 0, 153, .6)';
                                    case 18:
                                    case 43:
                                    case 68:
                                    case 93:
                                        return  'rgba(153, 0, 153, .6)';
                                    case 19:
                                    case 44:
                                    case 69:
                                    case 94:
                                        return 'rgba(153, 0, 76, .6)';
                                    case 20:
                                    case 45:
                                    case 70:
                                    case 95:
                                        return  'rgba(64, 64, 64, .6)';
                                    case 21:
                                    case 46:
                                    case 71:
                                    case 96:
                                        return  'rgba(255, 153, 153, .6)';
                                    case 22:
                                    case 47:
                                    case 72:
                                    case 97:
                                        return  'rgba(255, 255, 153, .6)';
                                    case 23:
                                    case 48:
                                    case 73:
                                    case 98:  
                                        return  'rgba(102, 178, 255, .6)';
                                    case 24:
                                    case 49:
                                    case 74:
                                    case 99:
                                        return  'rgba(204, 153, 255, .6)';
                                    case 25:
                                    case 50:
                                    case 75:
                                    case 100:
                                        return  'rgba(255, 153, 204, .6)';
                                    default:
                                        return  'rgba(0, 0, 0, .6)';
                                }
                            }
                            return(
                                <MultiCardScore
                                    key={i}
                                    color={{backgroundColor:changeColor(i+1)}}
                                    id={i + 1}
                                    username={this.state.username}
                                    date={format(new Date(multiUser.date),'MM/d/yyyy - kk:mm') }
                                    score={comma(multiUser.score)}
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
