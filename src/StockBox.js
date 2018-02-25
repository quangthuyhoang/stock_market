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
    console.log("inside stockbox. stockList", this.props.stockList, this.props.chartData)
     return (
        <div id="stockbox" className="center">
            <StockChart stockList={this.props.stockList} data={this.props.chartData} xAxis={this.props.xAxis}/>
            {/* <StockList stockList={this.props.stockList}/> */}
        </div>
     )
  
 }
}

export default StockBox;