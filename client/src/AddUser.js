import React, {Component} from 'react';

class AddUser extends Component{
    //constructors saves state
    constructor(props) {
        super(props);
        this.state = {
            data: "",
        };
    }

    submitAddUserForm = (e) => {
        e.preventDefault();
        console.log("Submitting Add User");
        fetch('/users/newuser',
            {
                method: 'POST',
                headers: {
                    //tyoe of data sent and gicen
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                    imageURL: e.target.imageURL.value,

                }),
            })
            //response data sent that is being turned in txt
            .then(data => {
                return data.text()
            })
            .then(data => console.log("Message from server: " + data));
    };

    render() {
        return (
            <div >
                {/*<h1 className={'item-1'}>Register New User</h1>*/}

                <div id={'signUp'} className=".pure-u-md-1-2">
                    <fieldset>
                    <form className="pure-form pure-form-aligned" onSubmit={this.submitAddUserForm}>
                    <div className="pure-u-1-2">
                        <input type="text" name='username' placeholder="Enter username" autoFocus/></div>
                    <div className="pure-u-1-2">
                        <input type="password" name='password' placeholder="Enter password"/></div>
                    <div className="pure-u-1-2">
                        <input type="imageURL" name='imageURL' placeholder="add image URL"/></div>
                        <button type="submit" class="pure-button pure-button-primary">Submit</button>
                    </form>
                    </fieldset>
                </div>

            {/*    <form class="pure-form pure-form-aligned"  onSubmit={this.submitAddUserForm}>*/}

            {/*          <fieldset>*/}
            {/*              <div>*/}
            {/*              <label for="name">Username</label>*/}
            {/*            <input type="text" name='username' placeholder="Enter username" autoFocus/>*/}
            {/*              </div>*/}
            {/*              <diV>*/}
            {/*                   <label for="password">Password</label>*/}
            {/*                  <input type="password" name='password' placeholder="Enter password"/>*/}
            {/*              </diV>*/}
            {/*              <div>*/}
            {/*                  <label htmlFor="imageURL">add Image URL</label>*/}
            {/*                  <input type="imageURL" name='imageURL' placeholder="add image URL"/>*/}
            {/*              </div>*/}


            {/*

            {/*          </fieldset>*/}
            {/*</form>*/}


        {
            this.state.data
        }

    </div>
    );
    }
    }

    export default AddUser;