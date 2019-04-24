import React, { Component } from 'react';




class UpdateData extends Component{
    constructor(props) {
        super(props);
        this.state={
            loggedIn: false,
            message: '',

        };
        console.log(this.props.logInfo);
    }




    TweetItemUpdate=(e)=>{
        e.preventDefault();

        fetch('/users/updateTweet',{
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tweetId: '',
                privateCheckBox: '',

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
                    <h1>Edit Tweet {this.props.logInfo.username}</h1>
                    <form onSubmit={this.TweetItemUpdate}>
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

export default UpdateData;