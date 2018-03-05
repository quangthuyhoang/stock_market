import React, { Component } from 'react';
import './App.css';
import StockList from "./StockList.js";
import StockChart from "./StockChart";


class StockBox extends Component {
    constructor(props) {
        super(props);
        this.stockTypeHandler = this.stockTypeHandler.bind(this)
    }

    stockTypeHandler(e) {
        this.props.stockTypeHandler(e)
    }

 render() {
    console.log("inside stockbox. stockList", this.props.stockList, this.props.chartData)
     return (
        <div id="stockbox" className="center">
        
            <h1 className="App-title">Stock</h1>
            <div className="menu">
            <div className="menu-setting left">
            {/* <p>Stock Type</p> */}
            <button className="stockTypeBtn" onClick={this.updateView} >1M</button>
            <button className="stockTypeBtn" onClick={this.updateView} >3M</button>
            <button className="stockTypeBtn" onClick={this.updateView} >YTD</button>
            <button className="stockTypeBtn" onClick={this.updateView} >1Y</button>
          </div>
          <div className="menu-setting right">
            {/* <p>Stock Type a</p> */}
            <button className="stockTypeBtn" onClick={this.stockTypeHandler} >open</button>
            <button className="stockTypeBtn" onClick={this.stockTypeHandler} >close</button>
            <button className="stockTypeBtn" onClick={this.stockTypeHandler} >high</button>
            <button className="stockTypeBtn" onClick={this.stockTypeHandler} >low</button>
          </div>
          </div>
            <StockChart stockList={this.props.stockList} stockType={this.props.option.refType} data={this.props.chartData} xAxis={this.props.xAxis}/>
            {/* <StockList stockList={this.props.stockList}/> */}
        </div>
     )
  
 }
}

export default StockBox;