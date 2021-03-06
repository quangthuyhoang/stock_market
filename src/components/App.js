import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import StockBox from './StockBox';
import StockChart from './StockChart';
import StockList from "./StockList";
import commons from '../methods/commons';
import seed from '../reference/seed';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
import AddBox from "./AddBox";
import StockListContainer from '../containers/StockListContainer';


const listr = [
  // {_id: 0,"symbol":"TSLA","name":"Tesla, Inc.","sector":"Capital Goods","industry":"Auto Manufacturing", data: [], color: "#237dbc"},
  {_id: 0, "symbol":"MSFT","name":"Microsoft Corporation","sector":"Technology","industry":"Computer Software: Prepackaged Software", data: [], color: "#e22626"}
]


const xAxis = ["1.14", "1.21", "1.28", "2.04", "2.11", "2.18", "2.25", "3.03", "3.10", "3.17", "3.24", "3.31", "4.07", "4.14", "4.20", "4.28", "5.05", "5.12", "5.19", "5.26", "6.02", "6.09", "6.16", "6.23", "6.30", "7.07", "7.14", "7.21", "7.28", "8.04", "8.11", "8.18", "8.25", "9.01", "9.08", "9.15", "9.22", "9.29", "10.06", "10.13", "10.20", "10.27", "11.03", "11.10", "11.17", "11.24", "12.01", "12.08", "12.15", "12.22", "12.29", "1.05", "1.12", "1.19", "1.26", "2.02", "2.09", "2.16", "2.23", "3.02", "3.09", "3.16", "3.23", "3.30", "4.06", "4.12", "4.20", "4.27", "5.04", "5.11", "5.18", "5.25", "6.01", "6.08", "6.15", "6.22", "6.29", "7.06", "7.13", "7.20", "7.27", "8.03", "8.10", "8.17", "8.24", "8.31", "9.07", "9.10", "9.21", "9.28", "10.05", "10.12", "10.19", "10.26", "11.02", "11.09", "11.16", "11.23", "11.30", "12.07"]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input:"sdfsdf",
      companyList: listr,
      data: [],
      xAxis: [],
      option: {
        intervalLength: "DAILY",
        viewScope: "year",
        refType: "close",
        xAxis: "TIME_SERIES"
      }
    }

    // this.updateListhandler = this.updateListhandler.bind(this)

    this.updateView = this.updateView.bind(this);
    this.updateStockType = this.updateStockType.bind(this)
  }
  componentDidMount() {
 
    var p = commons.fetchData('TIME_SERIES', this.state.option.intervalLength, listr[0].symbol);
   
    p.then(commons.checkStatus)
      .then(commons.parser)
      .then((data) => {
        var newData = this.state.data;
        newData.push(data)
        
        this.setState({data: newData}, function() {
          this.xAxisHandler()
          
        })
      })
      .catch(function(err) {
        console.log("There's been some kind of error", err)
      })
  }

  componentWillMount() {
    
  }

  xAxisHandler() {
    console.log("xAxis handler", this.props.data)
    // if(this.props.data && this.props.data.length > 0) {
      this.props.xAxis(this.state.data[0].data)
    // }
    // this.props.xAxis(this.props.data[])
    var timeseries = commons.timeSeries(this.state.data[0].data);
    this.setState({xAxis: timeseries}, () => {
    })
  }

  updateXAxisHandler() {
    
    

  }

  updateDaily() {
    // update at midnight

    // update all store at midnight

    // update xAxis
  }


    updateStockType(e) {
      this.props.typeSelect(e.target.innerHTML)
    }

    updateView(e) {
      var newScope = e.target.innerHTML;
      var nOption = this.state.option;
      nOption.viewScope = newScope;
      this.setState({option: nOption})
    }

  render() {

    return (
      <div className="App">
      
        <StockBox chartData={this.props.data} stockList={this.state.companyList} 
        xAxis={this.state.xAxis} option={this.props.option} intLen={this.state.option.intervalLength}
        stockTypeHandler={this.updateStockType}/>
        {/* <StockListContainer input={this.state.input}/> */}
        <StockList stockList={this.props.data} del={this.props.del} onHandleSubmit={this.props.handleSubmit}/>
      </div>
    );
  }p
}

export default App;
