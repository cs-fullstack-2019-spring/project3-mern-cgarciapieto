import React, { Component } from 'react';


class LoggedInData extends Component{
    constructor(props) {
        super(props);
        this.state={
            loggedIn: false,
            message: '',

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

            /*it is required that to submit to database the model has to be attributes  shown in the schema */
            body: JSON.stringify(
                {
                        username: this.props.logInfo.username,
                        imageURL: this.props.logInfo.imageURL,
                        tweetItems: {
                            messageField: e.target.messageField.value,
                            tweetImageUrl: e.target.tweetImageUrl.value,
                            privateCheckBox: true
                        }
                    }
                ),
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
                    <form className={'form2'} onSubmit={this.TweetItemsSubmit}>
                        <p>
                            <label htmlFor={"messageField"}>tweet here:</label>
                            <textarea type="text" id={"messageField"} name={"messageField"}/>
                            <label htmlFor={"tweetImageUrl"}>add image here:</label>
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