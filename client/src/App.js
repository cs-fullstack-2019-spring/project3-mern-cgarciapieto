import React, { Component } from 'react';
import logo from './logo.svg';

import 'purecss/build/pure.css'

import './App.css';
import TwitterHome from "./TwitterHome";



class App extends Component {
  render() {
    return (

      <div className="App">
        <TwitterHome/>

      </div>
    );
  }
}

export default App;
