import React, { Component } from 'react';
import logo from './logo.svg';

import 'purecss/build/pure.css'

import './App.css';
import TwitterHome from "./TwitterHome";
import PublicTweets from "./PublicTweets";
import AllTweets from "./AllTweets";



class App extends Component {
  render() {
    return (

      <div className="App">
        <AllTweets/>


      </div>
    );
  }
}

export default App;
