import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StockBox from './StockBox';
import StockChart from './StockChart';
import StockList from "./StockList.js";
import commons from './commons';
import onError from './OnError';
import seed from './reference/seed';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions/actions';
import AddBox from "./AddBox";
import StockListContainer from './containers/StockListContainer';

const toChartDataSet = require('./commons').chartDataSet;
// const getStockTypeArr = require('./commons').getStockTypeArr;
const convert2Number = require('./commons').isNumber;
const randColor = require('./commons').getRandomColor;

const stockType = ['open', 'high','low', 'close'];

const listr = [
  // {_id: 0,"symbol":"TSLA","name":"Tesla, Inc.","sector":"Capital Goods","industry":"Auto Manufacturing", data: [], color: "#237dbc"},
  {_id: 0, "symbol":"MSFT","name":"Microsoft Corporation","sector":"Technology","industry":"Computer Software: Prepackaged Software", data: [], color: "#e22626"}
]

// const seedr = commons.parser(seed2)
// var data = []
// data.push(seedr)
// console.log("before everything", data)

// const xAxis = []
const xAxis = ["1.14", "1.21", "1.28", "2.04", "2.11", "2.18", "2.25", "3.03", "3.10", "3.17", "3.24", "3.31", "4.07", "4.14", "4.20", "4.28", "5.05", "5.12", "5.19", "5.26", "6.02", "6.09", "6.16", "6.23", "6.30", "7.07", "7.14", "7.21", "7.28", "8.04", "8.11", "8.18", "8.25", "9.01", "9.08", "9.15", "9.22", "9.29", "10.06", "10.13", "10.20", "10.27", "11.03", "11.10", "11.17", "11.24", "12.01", "12.08", "12.15", "12.22", "12.29", "1.05", "1.12", "1.19", "1.26", "2.02", "2.09", "2.16", "2.23", "3.02", "3.09", "3.16", "3.23", "3.30", "4.06", "4.12", "4.20", "4.27", "5.04", "5.11", "5.18", "5.25", "6.01", "6.08", "6.15", "6.22", "6.29", "7.06", "7.13", "7.20", "7.27", "8.03", "8.10", "8.17", "8.24", "8.31", "9.07", "9.10", "9.21", "9.28", "10.05", "10.12", "10.19", "10.26", "11.02", "11.09", "11.16", "11.23", "11.30", "12.07"]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyList: listr,
      data: [],
      xAxis: xAxis,
      option: {
        intervalLength: "DAILY",
        viewScope: "year",
        refType: "close",
        xAxis: "TIME_SERIES"
      }
    }

    this.updateListhandler = this.updateListhandler.bind(this)
    this.removeItem = this.removeItem.bind(this);
    this.updateView = this.updateView.bind(this);
    this.updateStockType = this.updateStockType.bind(this)
  }
  componentDidMount() {
    // if(this.props.data.length === 0) {
    //   // invoke fetch default data
    //   console.log("no data in store")
    // }
    // dev purppose only
  //  console.log("component did mount")
  // console.log("beofre component did mount", this.state.option.intervalLength)
    var p = commons.fetchData('TIME_SERIES', this.state.option.intervalLength, listr[0].symbol);
   
    p.then(commons.checkStatus)
      .then(commons.parser)
      .then((data) => {
        var newData = this.state.data;
        newData.push(data)
        
        this.setState({data: newData}, function() {
          // console.log("component will mount", this.state.data)
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
      // console.log("xAxis handler invoked", this.state.xAxis)
    })
  }

  updateXAxisHandler() {
    var data = this.state.data[0].data;
    const intlen = this.state.option.intervalLength;
    const scope = this.state.option.viewScope;
    // depending on scope size thats how much we are going to view

    // rever

  }

  updateListhandler(symbol) {

    const sym = symbol;
    var newList = this.state.companyList;
    // Error Handler
    if (onError.isSymListed(sym, newList) || (commons.createCompany(sym).error) ) {
      console.log(sym, onError.isSymListed(sym, newList), commons.createCompany(sym).error, newList)
      console.log(sym, "already exist on list or does not exist in Nasdaq list.")
      return
    }
   commons.fetchData("TIME_SERIES", this.state.option.intervalLength, sym)
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
          // console.log(newList[i])
        }

        let newId = newData.length;
        result._id = newId;
        result.description = commons.createCompany(result.symbol)
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
        return company._id !== ref
      })
  
      for(let i = 0; i < newList.length; i++) {
        newList[i]._id = i;
      }
      // remove data from list
      var removed = newData.splice(ref, 1)
   
      this.setState({companyList: newList, data: newData})
    }

    updateStockType(e) {
      var type = e.target.innerHTML;
      var nOption = this.state.option;
      nOption.refType = type;
      this.setState({option: nOption})
    }

    updateView(e) {
      var newScope = e.target.innerHTML;
      var nOption = this.state.option;
      nOption.viewScope = newScope;
      this.setState({option: nOption})
    }

  render() {
    console.log("inside App test", this.props.store)
    return (
      <div className="App">
      
        
        <StockBox chartData={this.state.data} stockList={this.state.companyList} 
        xAxis={this.state.xAxis} option={this.state.option} intLen={this.state.option.intervalLength}
        stockTypeHandler={this.updateStockType}/>
        <StockListContainer />
        {/* <StockList stockList={this.state.companyList} del={this.removeItem} onHandleSubmit={this.updateListhandler}/> */}
 
      </div>
    );
  }
}

// allow us to use state data to be passed down as props
function mapStateToProps(state, ownProps) {
  return {
    data: state.data,
    companyList: state.companyList
  }
}
// allow us to use actions dispatch to be passed down as props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default App;


// Original
// render() {
   
//   return (
//     <div className="App">
    
      
//       <StockBox chartData={this.state.data} stockList={this.state.companyList} 
//       xAxis={this.state.xAxis} option={this.state.option} intLen={this.state.option.intervalLength}
//       stockTypeHandler={this.updateStockType}/>
//       <StockList stockList={this.state.companyList} del={this.removeItem} onHandleSubmit={this.updateListhandler}/>

//     </div>
//   );
// }