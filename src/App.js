import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StockBox from './StockBox';
import StockChart from './StockChart';
import commons from './commons';
import seed from './seed';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
      seed: seed,
      data: {},
    }
  }
  componentDidMount() {
    // var a = "hello";
    // fetch(a).then(commons.test)
    // .then(function(str) {
    //   console.log("its in appjs now",str)
    // })
    fetch(this.props.url).then(commons.checkStatus)
    .then(commons.toArray)
    .then((data) => {
      console.log("in appjs",typeof data, data)
      // var newData = {symbol: data["Meta Data"]["2. Symbol"]}
      this.setState({data: data}, function() {
        console.log("state data has been set")
      })
    }).catch(function(error) {
      console.log("There's some kind of error:", error);
  });
  }

  getStockData(url) {
    fetch(url).then(function(response) {
      if(response.status !== 200 || !response.ok) {
        console.log("There's been a bad request or response");
        return;
      }
      
      return response.json();
    })
    .then((data) => {
      console.log(data)
      this.setState({data: data})
    }).catch(function(error) {
      console.log("There's some kind of error:", error);
  });
  }

  render() {
    var data = "";
    console.log("before",this.state.data)
    if(this.state.data && this.state.data["Meta Data"]) {
      console.log("1", this.state.data["Meta Data"])
      data = this.state.data["Meta Data"]["2. Symbol"];
    }
    
 
    // const symbol = data["Meta Data"]["2. Symbol"];

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Stock Market Watch - All Things Tech</h1>
        </header>
        
        <StockBox />
        <p>
          {data}
        </p>
      </div>
    );
  }
}

export default App;
