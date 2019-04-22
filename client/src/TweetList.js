import React, {Component} from 'react';

class TweetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            mappedTweets: [],
        };
    }


    componentDidMount() {
        this.fetchUserTweetData();
    }

    signInUser = (e) => {
        e.preventDefault();
        console.log("Submitting Log in");
        fetch('/users/login',
            {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),
            })

            .then(data => {
                return data.text()
            })

            .then(response => {
                if (response) {

                    this.props.loggedInUserInfo(response, true);

                    return this.fetchUserTweetData();
                } else
                    return this.props.loggedInUserInfo(response, false)
            });
    };


    fetchUserTweetData() {

        fetch('/users/getTweet')

            .then(data => data.json())

            .then(response => {
                return this.setState({tweets: response.tweet}, () => this.mappedTweetFunction())
            });
    }


    mappedTweetFunction() {

        let mapArray = [];

        console.log(this.state.tweets);
        let tempArray = [];
        if (this.state.tweets)

            tempArray = this.state.tweets;


        if (tempArray.length > 0) {
            console.log("Array");
            console.log(this.tweets);
            mapArray = this.state.tweets.map(
                (_id) => {
                    return (<div>
                        <h1>Something</h1>
                    </div>)
                }
            );
            console.log(mapArray);
        } else {
            console.log("no tweets for " + this.props.logInfo.username);
            mapArray = [];
        }

        this.setState({mappedTweets: mapArray});
    }

    render() {
        return (
            <div>
                {this.props.logInfo.loggedIn ?

                    (<div>
                        <h1>{this.props.logInfo.username}'s Tweets</h1>
                        {this.state.mappedTweets}
                    </div>) :

                    (<div>
                            <p>Please log in</p>
                            <form onSubmit={this.signInUser}>
                                <p>
                                    <label htmlFor={"username"}>Enter username:</label>
                                    <input type="text" name={"username"} id={"username"}/>
                                </p>
                                <p>
                                    <label htmlFor={"password"}>Enter password:</label>
                                    <input type="text" name={"password"} id={"password"}/>
                                </p>
                                <button>Sign In</button>
                            </form>
                        </div>
                    )}
            </div>
        );
    }
}

export default TweetList;