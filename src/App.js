import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StockBox from './StockBox';
import StockChart from './StockChart';
import StockList from "./StockList.js";
import commons from './commons';
import seed from './reference/seed';
import seed2 from './reference/seed2';
import AddBox from "./AddBox";

const toChartDataSet = require('./commons').chartDataSet;
const convert2Number = require('./commons').isNumber;


const listr = [
  {_id: 0, "symbol":"MSFT","name":"Microsoft Corporation","sector":"Technology","industry":"Computer Software: Prepackaged Software", data: []},
  {_id: 0,"symbol":"TSLA","name":"Tesla, Inc.","sector":"Capital Goods","industry":"Auto Manufacturing", data: []}
]

const seedr = commons.parser(seed2)
var data = []
data.push(seedr)

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
    }

    this.updateListhandler = this.updateListhandler.bind(this)
    this.removeItem = this.removeItem.bind(this);
    this.getStockData = this.getStockData.bind(this);
  }
  componentDidMount() {
    // dev purppose only
  //  console.log("component did mount")
    var p = commons.fetchData('TIME_SERIES', 'MONTHLY', listr[0].symbol);
   
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

  // Will be used later for api data // **** PRODUCTION CODE DO NOT DELETE ********
  getStockData(symbol) {

    var p = commons.fetchData('TIME_SERIES', "MONTHLY", symbol);
  
    var result = p.then(commons.checkStatus)
      .then(commons.parser)
      .then((data) => {
        return data;
      })
      .catch(function(err) {
        console.log("There's been some kind of error:", err)
      })

      return result;
    }

  chartDataSet() {
    // var stock = this.state.data
    // const ydata = stock.splice(1,15).map(function(obj) {
    //   return obj.stock["4. close"];
    // })
    // return toChartDataSet("FB", convert2Number(ydata), "yellow")

    // 
    const currList = this.state.companyList;
    
    var newDataset = currList.map(function(company) {
   
        var result = this.getStockData(company.symbol);
        const symbol = result.shift();

        const data = result.map(function(obj) {
          return obj.stock["4. close"];
        })

        return toChartDataSet(symbol, convert2Number(data), "blue")
    })

    this.setState({data: newDataset})
  }

  // CRUD methods
  // Add Item

  updateListhandler(symbol) {
    // checks if symbol is null or undefined
    if(!symbol || symbol.length < 1) {
      console.log("error with addtoListHandler input")
      return;
    }
    // check if company already on list
    var newList = this.state.companyList;
    for(let j = 0; j < newList.length; j++) {
      if(newList[j].symbol === symbol) {
        console.log("Item already exist on the list.")
        return;
      }
    }

    // returns object with name, symbol, summary
    var newComp = commons.createCompany(symbol)

    // Check for errors
    if(newComp.error) {
      console.log(newComp.error);
      return;
    }
    
    // Create new list
    newList.push(newComp)
    for(let i = 0; i < newList.length; i++) {
      newList[i]._id = i
    }
       
    this.setState({companyList: newList}, ()=> {
      this.chartDataSet()
    })
  }

    // Remove Item from list
    removeItem(ref) {
 
      const currList = this.state.companyList;
      var newList = currList.filter((company) => {
        return company._id !== ref
      })

      for(let i = 0; i < newList.length; i++) {
        newList[i]._id = i;
      }
      
      this.setState({companyList: newList})
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
