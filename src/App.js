import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StockBox from './StockBox';
import StockChart from './StockChart';
import commons from './commons';
import seed from './reference/seed';
import AddBox from "./AddBox";

const toChartDataSet = require('./commons').chartDataSet;
const isNumber = require('./commons').isNumber;


const listr = [{
  name: "Microsoft",
  symbol: "MSFT"
},
{
  name: "Tesla",
  symbol: "TSLA"
}
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyList: listr,
      seed: seed,
      data: [],
      xAxis: ["2000-01-14", "2000-01-21", "2000-01-28", "2000-02-04", "2000-02-11", "2000-02-18", "2000-02-25", "2000-03-03", "2000-03-10", "2000-03-17", "2000-03-23"],
    }

    this.updateListhandler = this.updateListhandler.bind(this)
  }
  componentWillMount() {
    // dev purppose only
   
    var p = commons.getData('TIME_SERIES', 'MONTHLY', listr[0].symbol);
   
    p.then(commons.checkStatus)
      .then(commons.toArray)
      .then((data) => {
        this.setState({data: data}, function() {
          console.log("data has been set")
          this.timeSeries()
        })
      })
      .catch(function(err) {
        console.log("There's been some kind of error", err)
      })
  }

  updateListhandler(symbol) {
    if(!symbol) {
      console.log("error with addtoListHandler input")
      return;
    }

    // returns object with name, symbol, summary
    var newComp = commons.createCompany(symbol)
  console.log("newCOmp",newComp)
    var newList = this.state.companyList;
    newList.push(newComp)
    this.setState({companyList: newList})
  }

  timeSeries() {
    var timeseries = commons.timeSeries(this.state.data).slice(0,20);
    this.setState({xAxis: timeseries}, () => {
      console.log("timeseries, now chartdataset", this.state.xAxis)
    })
  }

  // Will be used later for api data // **** PRODUCTION CODE DO NOT DELETE ********
  getStockData(symbol) {
    var p = commons.getData('TIME_SERIES', "MONTHLY", symbol);
  
    var result = p.then(commons.checkStatus)
      .then(commons.toArray)
      .then((data) => {
        return data;
      })
      .catch(function(err) {
        console.log("There's been some kind of error:", err)
      })

      return result;
    }

  chartDataSet() {
    var stock = this.state.data
    const ydata = stock.splice(1,15).map(function(obj) {
      return obj.stock["4. close"];
    })
    return toChartDataSet("FB", isNumber(ydata), "yellow")
  }

  render() {
    console.log(commons.createCompany)
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Stock Market Watch - All Things Tech</h1>
        </header>
        
        <StockBox chartData={this.chartDataSet()} timeseries={this.state.xAxis} stockList={this.state.companyList}/>
        <AddBox onHandleSubmit={this.updateListhandler}/>
        <p>
          {/* {data} */}
        </p>
      </div>
    );
  }
}

export default App;
