import React, { Component } from 'react';
import './App.css';

class StockChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    
    render() {
        return (
           <div id="stockchart" className="left">
            <p>Pending Data</p>
           </div>
        )
     
    }
   }
   
   export default StockChart;