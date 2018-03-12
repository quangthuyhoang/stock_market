import React, { Component } from 'react';
import './App.css';
import Company from './Company';
import AddBox from './AddBox';

class StockList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: "",
        }
    }


 render() {

    var listr = this.props.stockList.map((company, i) => {
        return <Company key={i} name={company.name} symbol={company.symbol} industry={company.industry} id={i} del={this.props.del} /> 
    })
    listr.push(<AddBox onHandleSubmit={this.props.onHandleSubmit}key={listr.length}/>)
     return (
        <div id="stocklist" className="center">
            {listr}
        </div>
     )
  
 }
}

export default StockList;