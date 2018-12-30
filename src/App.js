import React, { Component } from 'react';
import logo from './logo.svg';
import SnowStorm from 'react-snowstorm';
import './App.css';
import Switch from './components/ToggleSwitch';

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
  constructor(props) {
    super(props);
    this.state = {
      snowEffect: false
    };
  }

  triggerSnowEffect = () => {
    const { snowEffect } = this.state
    if (snowEffect) {
      this.setState({
        snowEffect: false
      })
    } else {
      this.setState({
        snowEffect: true
      })
    }
  }

  render() {
    const { snowEffect } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <div style={{ margin: "2em" }}>
            <Switch onClick={this.triggerSnowEffect} />
            <h2>Toggle snow effect</h2>
          </div>
          {snowEffect ? <SnowStorm /> : ''}
        </header>
        <div className="App-body">
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
        </div>
      </div>
    );
  }
}

export default App;
