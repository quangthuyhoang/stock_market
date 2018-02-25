import React, { Component } from 'react';
import './App.css';

class AddBox extends Component {
    constructor(props) {
		super(props);
		this.state = {
			input: "",
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(e) {
        e.preventDefault();
		this.setState({input: e.target.value})
	}

	handleSubmit(e) {
        e.preventDefault();

		if(e.keyCode !== 13){
			return;
		}
		console.log(this.state.input)
		this.props.onHandleSubmit(this.state.input)
	}
    
 render() {

     return (
        <div className="addbox">
            <input type="text" onChange={this.handleInputChange} onKeyUp={this.handleSubmit} placeholder="MFST"/>
            <button onClick={this.handleSubmit} >Add</button>
        </div>
     )
  
 }
}

export default AddBox;