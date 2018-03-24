import React, { Component } from 'react';
import '../App.css';
import Company from './Company';
import AddBoxContainer from '../containers/AddBoxContainer';
import AddBox from './AddBox';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';


class StockList extends Component {
    constructor(props) {
        super(props);
    }


 render() {

    var listr = this.props.stockList.map((company, i) => {
        return <Company key={i} name={company.info.name} symbol={company.symbol} industry={company.info.industry} id={i} del={this.props.del} /> 
    })
    listr.push(<AddBox onHandleSubmit={this.props.onHandleSubmit} key={listr.length}/>)
     return (
        <div id="stocklist" className="center">
            {listr}
        </div>
     )
  
 }
}



export default StockList;