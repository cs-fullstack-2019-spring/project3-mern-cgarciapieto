import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class PublicTweets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            mappedTweets:[]
        }
    }



    componentDidMount() {
        this.getDataFromDatabase();
    }


    getDataFromDatabase=() =>{
        console.log("getting tweets");

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
            .then(data => data.json())
            .then(response => {
                return this.setState({tweets: response.tweets}, () => this.mappedTweetFunction())
            });
    };


    mappedTweetFunction() {

        let mapArray = [];

        console.log(this.state.tweets);
        let tempArray = [];
        if (this.state.tweets)

            tempArray = this.state.tweets;
        console.log('this.tweets', this.tweets);

        if (tempArray.length > 0) {
            console.log('this.tweets', this.tweets);
            mapArray = this.state.tweets.map(
                (value) => {
                    return (
                        <div>
                            <ul>
                                <img  src= {value.imageURL} alt=''/>
                                <p>{ value.messageField }</p>
                                <img  src= {value.tweetImageUrl} alt=''/>
                            </ul>
                        </div>
                    )
                }
            );
            console.log(mapArray);
        } else {
            console.log("no tweets available ");
            mapArray = [];
        }

        this.setState({mappedTweets: mapArray});
    }

    render() {
        return (
            <div>
                {

                    (<div>
                        {this.state.mappedTweets}
                    </div>)
                }

            </div>
        );
    }
}

export default PublicTweets;