import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";



class AllTweets extends Component {

    state = {
        data: [],
        messageField: String,
        tweetImageUrl: String,

    };




    componentDidMount() {
        this.getDataFromDatabase();

    }

    getDataFromDatabase = () => {
        fetch('users/getData')
            .then((data) => data.json())
            .then((res) => this.setState({ data: res.data }));
    };

    render() {
        const { data } = this.state;
        return (
            <div>
                <ul>
                    {data.length <= 0}
                </ul>


export default AllTweets;