# CustomDateRangePicker

custom-date-range-picker is a simple to use yet customizable component for having different Date Range selection.

  - CSS customizable & Custom position - Work in Progress,

### Installation

This requires [React.js and Prop-Types] to run.
```sh
npm i custom-date-range-picker
```

### How to Use

Install and import rcustom-date-range-picker and pass the props as per the below table

```sh
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CustomDateRangePicker from 'custom-date-range-picker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <CustomDateRangePicker />
      </div>
    );
  }
}

export default App;

```

## Contribution

You are welcome to raise issues and PRs in the repository
