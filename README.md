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

  selectedDateRange = (value, dates, label) => {
    // Argument 1: value is the date that is displayed on selection like : 2 Jun - 9 Jun
    // Argument 2: Return an Array of objects with length 2.
        // Each Moment object has details such as follows: 
        // _d: Sun Jun 02 2019 20:22:44 GMT+0530 (India Standard Time) 
        // _isAMomentObject: true
        // _isUTC: false
        // _isValid: true
        // _locale: P {_calendar: {…}, _longDateFormat: {…}, _invalidDate: "Invalid date", ordinal: ƒ, // _dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, …}
        // _pf: {empty: false, unusedTokens: Array(0), unusedInput: Array(0), overflow: -2, charsLeftOver: 0, …}
    // Argument 3: Return Label Name of the selected option. For example Last 7 Days, Last 30 Days, Today ....(On selection of Last N Days the third parameter returns a Number that is entered)
  }

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
        <CustomDateRangePicker 
          getDateRange={this.selectedDateRange}
        />
      </div>
    );
  }
}

export default App;

```

## Contribution

You are welcome to raise issues and PRs in the repository
