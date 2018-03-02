import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StockBox from './StockBox';
import StockChart from './StockChart';
import StockList from "./StockList.js";
import commons from './commons';
import onError from './OnError';
import seed from './reference/seed';
import seed2 from './reference/seed2';
import AddBox from "./AddBox";

const toChartDataSet = require('./commons').chartDataSet;
const getStockDataType = require('./commons').getStockDataType;
const convert2Number = require('./commons').isNumber;
const randColor = require('./commons').getRandomColor;



const listr = [
  {_id: 0,"symbol":"TSLA","name":"Tesla, Inc.","sector":"Capital Goods","industry":"Auto Manufacturing", data: [], color: "#237dbc"},
  {_id: 1, "symbol":"MSFT","name":"Microsoft Corporation","sector":"Technology","industry":"Computer Software: Prepackaged Software", data: [], color: "#e22626"}
]

const seedr = commons.parser(seed2)
var data = []
data.push(seedr)
console.log("before everything", data)

// const xAxis = []
const xAxis = ["1.14", "1.21", "1.28", "2.04", "2.11", "2.18", "2.25", "3.03", "3.10", "3.17", "3.24", "3.31", "4.07", "4.14", "4.20", "4.28", "5.05", "5.12", "5.19", "5.26", "6.02", "6.09", "6.16", "6.23", "6.30", "7.07", "7.14", "7.21", "7.28", "8.04", "8.11", "8.18", "8.25", "9.01", "9.08", "9.15", "9.22", "9.29", "10.06", "10.13", "10.20", "10.27", "11.03", "11.10", "11.17", "11.24", "12.01", "12.08", "12.15", "12.22", "12.29", "1.05", "1.12", "1.19", "1.26", "2.02", "2.09", "2.16", "2.23", "3.02", "3.09", "3.16", "3.23", "3.30", "4.06", "4.12", "4.20", "4.27", "5.04", "5.11", "5.18", "5.25", "6.01", "6.08", "6.15", "6.22", "6.29", "7.06", "7.13", "7.20", "7.27", "8.03", "8.10", "8.17", "8.24", "8.31", "9.07", "9.10", "9.21", "9.28", "10.05", "10.12", "10.19", "10.26", "11.02", "11.09", "11.16", "11.23", "11.30", "12.07"]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyList: listr,
      seed: seed,
      data: data,
      // xAxis: ["2000-01-14", "2000-01-21", "2000-01-28", "2000-02-04", "2000-02-11", "2000-02-18", "2000-02-25", "2000-03-03", "2000-03-10", "2000-03-17", "2000-03-23"],
      xAxis: xAxis,
      option: {
        intervalLength: "MONTHLY",
        viewScope: "year",
        refType: "close",
        xAxis: "TIME_SERIES"
      }
    }

    this.updateListhandler = this.updateListhandler.bind(this)
    this.removeItem = this.removeItem.bind(this);
    // this.getStockData = this.getStockData.bind(this);
  }
  componentDidMount() {
    // dev purppose only
  //  console.log("component did mount")
  console.log("beofre component did mount", listr[0].symbol)
    var p = commons.fetchData('TIME_SERIES', 'MONTHLY', listr[1].symbol);
   
    p.then(commons.checkStatus)
      .then(commons.parser)
      .then((data) => {
        var newData = this.state.data;
        newData.push(data)
        
        this.setState({data: newData}, function() {
          console.log("component will mount", this.state.data)
          // this.chartDataSet()
          this.xAxisHandler()
        })
      })
      .catch(function(err) {
        console.log("There's been some kind of error", err)
      })
  }

  xAxisHandler() {
    var timeseries = commons.timeSeries(this.state.data[0].data);
    this.setState({xAxis: timeseries}, () => {
      console.log("xAxis handler invoked", this.state.xAxis)
    })
  }

  // // Will be used later for api data // **** PRODUCTION CODE DO NOT DELETE ********
  // getStockData(symbol) {

  //   var p = commons.fetchData('TIME_SERIES', "MONTHLY", symbol);
  
  //   var result = p.then(commons.checkStatus)
  //     .then(commons.parser)
  //     .then((data) => {
  //       return data;
  //     })
  //     .catch(function(err) {
  //       console.log("There's been some kind of error:", err)
  //     })

  //     return result;
  //   }

    updateListhandler(symbol) {

    const sym = symbol;
    var newList = this.state.companyList;
    // Error Handler
    if (onError.isSymListed(sym, newList) || (commons.createCompany(sym).error) ) {
      console.log(sym, onError.isSymListed(sym, newList), commons.createCompany(sym).error, newList)
      console.log(sym, "already exist on list or does not exist in Nasdaq list.")
      return
    }

   commons.fetchData("TIME_SERIES", "MONTHLY", sym)
      .then(commons.checkStatus)
      .then(commons.parser)
      .then((result) => {

        var newList = this.state.companyList;
        var newData = this.state.data;

        // create new company tile
        var newComp = commons.createCompany(result.symbol)
        newComp.color = commons.getRandomColor();
        newList.push(newComp)
        for(let i = 0; i < newList.length; i++) {
          newList[i]._id = i
          console.log(newList[i])
        }
  
        // create new Data list
        newData.push(result)
        this.setState({companyList: newList, data: newData})

    })
  }



    // Remove Item from list
    removeItem(ref) {
      // remove company name from list
      const currList = this.state.companyList;
      const newData = this.state.data;

      var newList = currList.filter((company) => {
        console.log(company, ref)
        return company._id !== ref
      })
  
      for(let i = 0; i < newList.length; i++) {
        newList[i]._id = i;
      }
      // remove data from list
      var removed = newData.splice(ref, 1)
   
      this.setState({companyList: newList, data: newData})
    }

  render() {
  
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Stock Market Watch - Default uses OHLC AVG - Settings can be change</h1>
        </header>
        
        <StockBox chartData={this.state.data} stockList={this.state.companyList} xAxis={this.state.xAxis} />
        <StockList stockList={this.state.companyList} del={this.removeItem}/>
        <AddBox onHandleSubmit={this.updateListhandler}/>
        <p>
          {/* {data} */}
        </p>
      </div>
    );
  }
}

export default App;
