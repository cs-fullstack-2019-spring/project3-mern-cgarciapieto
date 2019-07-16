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
                return this.setState({tweets: response.tweets})
            });
    };

    publicTweets = (e)=>{
        this.setState({tweets:e.target.value});
        this.getDataFromDatabase();
    };

    render(){
        const mappedTweets = this.state.tweets && this.state.tweets.map((eachItem,index)=>{
            return(
                <div key={index}>
                    {eachItem.tweets.map((x, i) => (
                        <div key={i}>
                            <hr />
                            <img src={x.tweetImageUrl}/>
                            <p>{x.messageField}</p>
                        </div>
                    ))}
                </div>
            )
        });
        return (
            <div>
                <p>

                </p>
                {mappedTweets}
            </div>
        );

    }
}



export default PublicTweets;