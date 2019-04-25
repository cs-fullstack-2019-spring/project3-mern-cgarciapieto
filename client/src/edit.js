import React, { Component } from 'react';


console.log('0');

class Edit extends Component{
    constructor(props) {
        super(props);
        this.state={
            loggedIn: false,
            editTweets: '',

        };
        console.log(this.props.logInfo);
        console.log('0');
    }


    editTweet=(e)=>{
        e.preventDefault();
    console.log("1");
        fetch('/users/updateTweet',{

            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },


            body: JSON.stringify(
                {
                    username: this.props.logInfo.username,
                    tweets: {
                        messageField: e.target.messageField.value,
                        tweetImageUrl: e.target.tweetImageUrl.value,

                    }
                }
            ),
        });
        console.log("3")
            .then(data=>data.text())
            .then(response=>this.setState({message: response}));
    };







    render(){
        if(!this.props.logInfo.loggedIn){
            return(<div>
                <h1>Must Be logged In</h1>
            </div>);
        }
        else {console.log("4")
            return (

                <div>



                    <h1>Edit Tweet {this.props.logInfo.username}</h1>
                    <form onSubmit={this.editTweet}>
                        <p>
                            <label htmlFor={"messageField"}>tweet here:</label>
                            <textarea type="text" id={"messageField"} name={"messageField"}/>
                            <label htmlFor={"tweetImageUrl"}>add image here:</label>
                            <input type="text" id={"tweetImageUrl"} name={"tweetImageUrl"}/>
                        </p>
                        <button>Submit Edit</button>
                    </form>
                    {this.state.message}
                </div>
            );
        }
    }
}

export default Edit;