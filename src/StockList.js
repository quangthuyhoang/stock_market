import React, { Component } from 'react';
import './App.css';
import Company from './Company';
import AddBox from './AddBox';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions/actions';

const StockList = (props) => {

    console.log(props)
    function showList() {
        if(!props.stockList) {
            return (
                <AddBox onHandleSubmit={props.onHandleSubmit} />
            )
        }

        var listr = props.stockList.map((company, i) => {
            return <Company key={i} name={company.name} symbol={company.symbol} industry={company.industry} id={i} del={props.del} /> 
        })
        return listr.push(<AddBox onHandleSubmit={props.onHandleSubmit} key={listr.length}/>)
    }

    return (
        <div id="stocklist" className="center">
            {showList()}
        </div>
    ) 
}

export default StockList;

// class StockList extends Component {
//     constructor(props) {
//         super(props);
//     }


//  render() {
//     console.log("props check from store", props)
//     var listr = this.props.stockList.map((company, i) => {
//         return <Company key={i} name={company.name} symbol={company.symbol} industry={company.industry} id={i} del={this.props.del} /> 
//     })
//     listr.push(<AddBox onHandleSubmit={this.props.onHandleSubmit}key={listr.length}/>)
//      return (
//         <div id="stocklist" className="center">
//             {listr}
//         </div>
//      )
  
//  }
// }



// export default StockList;