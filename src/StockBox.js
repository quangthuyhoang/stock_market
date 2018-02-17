import React, { Component } from 'react';
import './App.css';
import StockList from "./StockList.js";
import StockChart from "./StockChart";

class StockBox extends Component {
 render() {
     return (
        <div id="stockbox" className="center">
            <StockChart />
            <StockList />
        </div>
     )
  
 }
}

export default StockBox;