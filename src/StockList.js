import React, { Component } from 'react';
import './App.css';
import Company from './Company';
import AddBoxContainer from './containers/AddBoxContainer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions/actions';

class StockList extends Component {
    constructor(props) {
        super(props);
    }

    

    renderEmptyList() {
        return (
            <AddBoxContainer onHandleSubmit={this.props.onHandleSubmit} />
        )
    }

    renderList() {
        var listr = this.props.stockList.map((company, i) => {
            return <Company key={i} name={company.name} symbol={company.symbol} industry={company.industry} id={i} del={this.props.del} /> 
        })
        return listr.push(<AddBoxContainer onHandleSubmit={this.props.handleSubmit} key={listr.length}/>)
    }

    showList() {
        console.log("stocklist",this.props)
        if(!this.props.stockList) {
            return (
                <AddBoxContainer onHandleSubmit={this.props.onHandleSubmit} />
            )
        }

        var listr = this.props.stockList.map((company, i) => {
            return <Company key={i} name={company.name} symbol={company.symbol} industry={company.industry} id={i} del={this.props.del} /> 
        })
        return listr.push(<AddBoxContainer onHandleSubmit={this.props.handleSubmit} key={listr.length}/>)
    }
    render() {

            

        if(!this.props.stockList) {
            return (
                <div id="stocklist" className="center">
                {this.renderEmptyList()}
            </div>
            )
        }

        return (
            <div id="stocklist" className="center">
                {this.renderList()}
            </div>
        )
    }
    
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