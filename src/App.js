import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StockBox from './StockBox';
import StockChart from './StockChart';
import commons from './commons';
import seed from './seed';
require('dotenv').config();
const toChartDataSet = require('./commons').chartDataSet;
const isNumber = require('./commons').isNumber;


const listr = [{
  company: "Microsoft",
  symbol: "MSFT"
},
// {
//   company: "Tesla",
//   symbol: "TSLA"
// }
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: listr,
      seed: seed,
      data: [],
      xAxis: ["2000-01-14", "2000-01-21", "2000-01-28", "2000-02-04", "2000-02-11", "2000-02-18", "2000-02-25", "2000-03-03", "2000-03-10", "2000-03-17", "2000-03-23"],
    }
  }
  componentWillMount() {
    // dev purppose only
    // console.log("hello", process.env.REACT_APP_stockAPIKey)
    // var p = commons.getData('TIME_SERIES', 'WEEKLY', "TLSA");
    // console.log("p",p)
    // p.then(commons.checkStatus)
    //   .then(commons.toArray)
    //   .then((data) => {
    //     this.setState({data: data}, function() {
    //       console.log("data has been set")
    //       this.timeSeries()
    //     })
    //   })
    const data = commons.toArray(seed)
    this.setState({data: data}, function() {
      console.log("data has been set")
      this.timeSeries()
    })

    // **** PRODUCTION CODE DO NOT DELETE ********
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
    var timeseries = commons.timeSeries(this.state.data).slice(0,20);
    this.setState({xAxis: timeseries}, () => {
      console.log("timeseries, now chartdataset", this.state.xAxis)
      this.chartDataSet();
    })
  }


  xAxisHandler(data) {
    var timeseries = commons.timeSeries(data).slice(0,20);
    return timeseries;
  }

  // Will be used later for api data // **** PRODUCTION CODE DO NOT DELETE ********
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
      const xAxis = this.timeSeries2(data)
      this.setState({data: data, xAxis: xAxis})
    }).catch(function(error) {
      console.log("There's some kind of error:", error);
  });
  }

  chartDataSet() {
    
    var stock = this.state.data
    const ydata = stock.splice(1,15).map(function(obj) {
      return obj.stock["4. close"];
    })
    // console.log("char")
    // console.log("timeseries", this.state.xAxis, "data", isNumber(ydata), "color", "yellow")
    return toChartDataSet("MSFT", isNumber(ydata), "yellow")
  }

  render() {
    
    
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Stock Market Watch - All Things Tech</h1>
        </header>
        
        <StockBox chartData={this.chartDataSet()} timeseries={this.state.xAxis} stockList={this.state.company}/>
        <p>
          {/* {data} */}
        </p>
      </div>
    );
  }
}

export default App;
