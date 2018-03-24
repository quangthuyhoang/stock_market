import React, { Component } from 'react';
import '../App.css';

class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
        }

        this.onExitHandler = this.onExitHandler.bind(this)
    }

    onExitHandler() {
        // console.log(this.props)
        this.props.del(this.props.id)
    }
 render() {
     return (
        <div className="tiles">
            <span><span className="symbol" >{this.props.symbol}</span><span onClick={this.onExitHandler} className="close-thik"></span></span>
          <p className="description">{this.props.name} Prices, Stock, and Dividends.</p>
        </div>
     )
  
 }
}

export default Company;