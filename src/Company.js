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
        <div className="tiles center">
          <p>{this.props.name} : {this.props.symbol}</p>
        </div>
     )
  
 }
}

export default Company;