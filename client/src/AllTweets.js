import React, {Component} from 'react';
import TweetList from "./TweetList";

class AllTweets extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tweets: []
        }
    }

    componentDidMount() {
        this.publicTweets();
    }
publicTweets=()=>{
    fetch('/users/getData', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data:{
                messageField: this.props.messageField,
                tweetImageUrl: this.props.tweetImageUrl,
                privateCheckBox: true

            }
        })
    })
        .then(data=>data.text())
        .then(response=>this.setState({tweets: response}));
};

render(){
        return (
            <ul>
                {this.state.tweets.map((item, index) => {
                    return(
                        <div key={index}>
                            <p>{item.messageField}</p>
                        </div>
                    )

                })}

            </ul>
        )
}




}

export default AllTweets;