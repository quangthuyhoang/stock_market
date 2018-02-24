import React, { Component } from 'react';
import './App.css';

class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
        }
    }


 render() {
     return (
        <div className="tiles">
            <span><span className="symbol" >{this.props.symbol}</span><a href="#" class="close-thik"></a></span>
        
          <p className="description">{this.props.name}: {this.props.industry}</p>
        </div>
     )
  
 }
}

export default Company;