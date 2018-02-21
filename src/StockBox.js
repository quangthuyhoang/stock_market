import React, { Component } from 'react';
import './App.css';
import StockList from "./StockList.js";
import StockChart from "./StockChart";

class StockBox extends Component {
    constructor(props) {
        super(props);
        this.state ={

        }
    }
 render() {
    console.log("stockbox", this.props.timeseries)
     return (
        <div id="stockbox" className="center">
            <StockChart data={this.props.chartData} xAxis={this.props.timeseries}/>
            <StockList />
        </div>
     )
  
 }
}

export default StockBox;