import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StockBox from './StockBox';
import StockChart from './StockChart';
import commons from './commons';
import seed from './seed';
const toChartDataSet = require('./commons').chartDataSet;
const isNumber = require('./commons').isNumber;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
      seed: seed,
      data: [],
    }
  }
  componentDidMount() {
    // dev purppose only
    const data = commons.toArray(seed)
    this.setState({data: data}, function() {
      console.log("data has been set")
    })

    // production code
    // fetch(this.props.url)
  //   .then(commons.checkStatus)
  //   .then(commons.toArray)
  //   .then((data) => {

  //     this.setState({data: data}, function() {
  //       console.log("state data has been set")
  //     })
  //   }).catch(function(error) {
  //     console.log("There's some kind of error:", error);
  // });
  }

  timeSeries() {
    var timeseries = commons.timeSeries(this.state.data).slice(0,10);
    return timeseries;
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
      // console.log(data)
      this.setState({data: data})
    }).catch(function(error) {
      console.log("There's some kind of error:", error);
  });
  }

  chartDataSet() {
    
    var stock = this.state.data
    const ydata = stock.splice(1,10).map(function(obj) {
      return obj.stock["4. close"];
    })
    // console.log("char")
    console.log("timeseries", this.timeSeries(), "data", isNumber(ydata), "color", "yellow")
    return toChartDataSet(this.timeSeries(), isNumber(ydata), "yellow")
  }

  render() {
    var data = "";
    // console.log("before",this.state.data)
    if(this.state.data && this.state.data.length > 2) {
      this.timeSeries();
      // console.log("1", this.state.data[0])
      // data = this.state.data[0].symbol;
      // var timeseries = commons.timeSeries(this.state.data).slice(0,10)
      // console.log(timeseries)
    }
    console.log(this.chartDataSet())
    

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Stock Market Watch - All Things Tech</h1>
        </header>
        
        <StockBox chartData={this.chartDataSet()} timeseries={this.timeSeries()}/>
        <p>
          {data}
        </p>
      </div>
    );
  }
}

export default App;
