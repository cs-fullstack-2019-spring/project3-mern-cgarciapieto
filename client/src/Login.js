import React, { Component } from 'react';


class Login extends Component{
    constructor(props) {
        super(props);
        this.state={
            data:[],
        };
    }



    submitLoginForm=(e)=>{
        e.preventDefault();
        console.log("Submitting Log in");
        fetch('/users/login',
            {
                method: 'POST',
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),
            })
            .then(data=>{ return data.text()})
            .then(data=>{if(data)
                return this.props.loggedInUserInfo(data, true);
            else
                return this.props.loggedInUserInfo(data, false)});


    };

    render(){


        return(
            <div>
                <h1>Log In</h1>
                <form onSubmit={this.submitLoginForm}>
                    <input type="text" name='username' placeholder="Enter username" autoFocus/>
                    <input type="password" name='password' placeholder="Enter password" />
                    <button>Sign In</button>
                </form>
                {this.state.data}
                {/*{userMap}*/}
            </div>
        );
    }
}

export default Login;