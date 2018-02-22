import React, { Component } from 'react';
import './App.css';
import Comapny from './Company';

// const stockList = [
//     {
//         company: "Microsoft",
//         symbol: "MSFT"
//     },
//     {
//         company: "Tesla",
//         symbol: "TSLA"
//     },
//     {
//         company: "Ford Motors",
//         symbol: "F"
//     },
//     {
//         company: "General Motors",
//         symbol: "GM"
//     },
//     {
//         company: "Apple",
//         symbol: "AAPL"
//     },
//     {
//         company: "Facebook",
//         symbol: "FB"
//     },
//     {
//         company: 'Amazon',
//         symbol: "AMZN"
//     }
// ]

class StockList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: "",
        }
    }


 render() {

    var listr = this.props.stockList.map((company, i) => {
        return <Comapny key={i} name={company.company} symbol={company.symbol} /> 
    })
     return (
        <div className="stocklist right">
            {listr}
        </div>
     )
  
 }
}

export default StockList;