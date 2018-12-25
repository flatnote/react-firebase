import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const SomeText = () => {
  return (
    <div>
      <h1>{addFireEmoji()}Hola!!! Is Lit {addFireEmoji()}</h1>
    </div>
  );
};

const addFireEmoji = () => {
  return <span role="img" aria-label="fire">🔥</span>
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SomeText />
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
