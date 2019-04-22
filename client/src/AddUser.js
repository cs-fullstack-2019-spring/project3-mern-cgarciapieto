import React, { Component } from 'react';

class AddUser extends Component{
    constructor(props) {
        super(props);
        this.state={
            data:"",
        };
    }

    submitAddUserForm=(e)=>{
        e.preventDefault();
        console.log("Submitting Add User");
        fetch('/users/newuser',
            {
                method: 'POST',
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                    imageURL: e.target.imageURL.value,
                    backgroundImageURL: e.target.backgroundImageURL.value,
                }),
            })
            .then(data=>{ return data.text()})
            .then(data=>console.log("Message from server: " + data));
    };

    render(){
        return(
            <div>
            <h1>Register New User</h1>
        <form onSubmit={this.submitAddUserForm}>
            <input type="text" name='username' placeholder="Enter username" autoFocus/>

        <input type="password" name='password' placeholder="Enter password" />
        <input type="imageURL" name='imageURL' placeholder="add image" />
        <input type="backgroundImageURL" name='backgroundImageURL' placeholder="backgroundImageURL" />

            <button>Sign In</button>
        </form>
        {this.state.data}

    </div>
    );
    }
}

export default AddUser;