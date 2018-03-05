import React, { Component } from 'react';
import './App.css';
import Comapny from './Company';
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
        return <Comapny key={i} name={company.name} symbol={company.symbol} industry={company.industry} id={i} del={this.props.del} /> 
    })
    listr.push(<AddBox />)
     return (
        <div id="stocklist" className="center">
            {listr}
        </div>
     )
  
 }
}

export default StockList;