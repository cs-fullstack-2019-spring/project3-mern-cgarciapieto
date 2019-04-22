import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TweetList from "./TweetList";
import AddUser from "./AddUser";
import Loggedout from "./Loggedout";
import LoggedInData from "./LoggedInData";

class TwitterHome extends Component{

    constructor(props) {
        super(props);
        this.state={
            logInfo:{
                username: null,
                loggedIn: false,
            },
        };
    }

    componentDidMount() {
        this.checkForUser();
    }

    checkForUser(){
        console.log("Check for user");
        fetch('/users')
            .then(data=>{
                return data.text();
            })
            .then(response=>{

                if(response) {
                    this.setState(
                        {
                            logInfo:{
                                username: response,
                                loggedIn: true,
                            }
                        });
                }
                else {
                    this.setState(
                        {
                            logInfo:{
                                username: null,
                                loggedIn: false,
                            }
                        });
                }

            });
    }


    loggedInUserInfo =(username, loggedIn)=>{
        console.log("Clear");
        console.log(username + "-" + loggedIn);
        this.setState({
            logInfo:{
                username: username,
                loggedIn: loggedIn,
            }
        });
    };

    logUserOut=()=>{
        console.log("Clicked Logout");
        fetch('/users/logout')
            .then(data=>{return data.text()})
            .then(data=>console.log(data))
            .then(()=>this.loggedInUserInfo(undefined, false))
            .catch(()=>console.log("Test"));
    };

    render(){
        return(
            <div>
                <Router>
                    <h1>twitter home</h1>

                    <Link className="links" to='/'>Home</Link>
                    <Link className="links" to='/adduser'>Create User</Link>
                    <Link className="links" to='/loggedIn'>Add Tweets</Link>
                    <Link className="links" to='/loggedout' onClick={this.logUserOut}>Log Out</Link>
                    <Route exact path='/' component={()=>{return <TweetList logInfo={this.state.logInfo} loggedInUserInfo={this.loggedInUserInfo} />} }/>
                    <Route exact path='/adduser' component={AddUser}/>
                    <Route exact path='/loggedIn' component={()=>{return <LoggedInData logInfo={this.state.logInfo} loggedInUserInfo={this.loggedInUserInfo}/>} }/>
                    <Route exact path='/loggedout' component={()=>{return <Loggedout/>} }/>
                </Router>
            </div>
        );
    }
}
export default TwitterHome;