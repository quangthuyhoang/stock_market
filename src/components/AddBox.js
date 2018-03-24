import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/actions'
import '../App.css';

class AddBox extends Component {
    constructor(props) {
		super(props);
		this.state = {
			input: "",
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onClickHandleSubmit = this.onClickHandleSubmit.bind(this)
	}

	handleInputChange(e) {
		e.preventDefault();
		this.setState({input: e.target.value})
	}

	handleSubmit(e) {
		e.preventDefault();
		
		if(e.keyCode !== 13 || e.target.value.length === 0){
			return;
		}

		this.props.onHandleSubmit(this.state.input)
		e.target.value = ""
		this.setState({input: ""})
		
	}

	onClickHandleSubmit(e) {
		if(this.state.input.length === 0) {
			return;
		}
		this.props.onHandleSubmit(this.state.input)
		this.setState({input: ""})
	}
    
 render() {
	
     return (
        <div id="addbox" className="tiles">
            <input type="text" onChange={this.handleInputChange} ref={el => this.inputstock = el} value={this.props.input} onKeyUp={this.handleSubmit} placeholder="Enter Stock Symbol"/>
            <button onClick={this.onClickHandleSubmit} >Add</button>
        </div>
     )
  
 }
}

export default AddBox;