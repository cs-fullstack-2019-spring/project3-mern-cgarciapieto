import React, { Component } from 'react';

class LoggedInData extends Component{
    constructor(props) {
        super(props);
        this.state={
            loggedIn: false,
            message: '',
            tweets:[]
        };
        console.log(this.props.logInfo);
    }

    TweetItemsSubmit=(e)=>{
        e.preventDefault();

        fetch('/users/addTweet',{
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.props.logInfo.username,
                // tweetImageUrl: e.target.tweetImageUrl.value,
                tweetItems: e.target.tweetItems.value,
                messageField: this.state.message


            }),
        })
            .then(data=>data.text())
            .then(response=>this.setState({message: response}));
    };

    render(){
        if(!this.props.logInfo.loggedIn){
            return(<div>
                <h1>Must Be logged In</h1>
            </div>);
        }
        else {
            return (
                <div>
                    <h1>Tweet Something {this.props.logInfo.username}</h1>
                    <form onSubmit={this.TweetItemsSubmit}>
                        <p>
                            <label htmlFor={"tweetItems"}>tweet here:</label>
                            <textarea type="text" id={"tweetItems"} name={"tweetItems"}/>
                            <label htmlFor={"hhhhs"}>add image here:</label>
                            <input type="text" id={"tweetImageUrl"} name={"tweetImageUrl"}/>
                        </p>
                        <button>Submit</button>
                    </form>
                    {this.state.message}
                </div>
            );
        }
    }
}

export default LoggedInData;