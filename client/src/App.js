import React, { Component } from 'react';
import logo from './logo.svg';

import 'purecss/build/pure.css'

import './App.css';
import TwitterHome from "./TwitterHome";
import PublicTweets from "./PublicTweets";



class App extends Component {
  render() {
    return (

      <div className="App">
        <PublicTweets/>


      </div>
    );
  }
}

export default App;
