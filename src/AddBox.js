import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './actions/actions'
import './App.css';

let AddBox = ({ props, dispatch }) => {
	let input = ""
    // constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		input: "",
	// 	}

	// 	this.handleInputChange = this.handleInputChange.bind(this);
	// 	this.handleSubmit = this.handleSubmit.bind(this);
	// 	this.onClickHandleSubmit = this.onClickHandleSubmit.bind(this)
	// }

	// const handleInputChange = (e) =>{
	// 	e.preventDefault();
	// 	input = e.target.value
	// }

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	if(e.keyCode !== 13){
	// 		return;
	// 	}
	// 	if(input.length === 0) {
	// 		return;
	// 	}
	// 	// this.props.onHandleSubmit(input)
	// 	dispatch(actions.GetStock(input))
	// 	console.log("after input length", input)
	// 	input = ""
	// 	console.log("after input length", input)
	// }

	// const onClickHandleSubmit = () => {
	// 	if(input.length === 0) {
	// 		return;
	// 	}
	// 	// this.props.onHandleSubmit(input)
	// 	dispatch(actions.GetStock(input))
	// 	console.log("after input length", input)
	// 	input = ""
	// 	console.log("after input length", input)
	// }


     return (
        <div id="addbox" className="tiles">
            <input type="text" onChange={input => this.handleInputChange} placeholder="Enter Stock Symbol"/>
            <button onClick={this.handleSubmit} >Add</button>
        </div>
     )
	//  onKeyUp={e => this.props.handleSubmit} 
 
}

function mapStateToProps(state, ownPros) {
    return {
      input: state.input
    }
  }
  // allow us to use actions dispatch to be passed down as props
  function mapDispatchToProps(dispatch) {
    return {
		handleInputChange: (input) => { 
			console.log(input) 
			dispatch(actions.handleInputChange(input)) 
		},
		handleSubmit: (txt) => { dispatch(actions.GetStock(txt)) }
    }
  }

AddBox = connect()(AddBox)

export default AddBox;

// class AddBox extends Component {
//     constructor(props) {
// 		super(props);
// 		this.state = {
// 			input: "",
// 		}

// 		this.handleInputChange = this.handleInputChange.bind(this);
// 		this.handleSubmit = this.handleSubmit.bind(this);
// 		this.onClickHandleSubmit = this.onClickHandleSubmit.bind(this)
// 	}

// 	handleInputChange(e) {
//         e.preventDefault();
// 		this.setState({input: e.target.value})
// 	}

// 	handleSubmit(e) {
// 		e.preventDefault();
		
// 		if(e.keyCode !== 13){
// 			return;
// 		}
		
// 		this.props.onHandleSubmit(this.state.input)
// 		dispatch(GetStock(this.state.input))
// 		this.setState({input: ""})
// 	}

// 	onClickHandleSubmit() {
// 		if(this.state.input.length === 0) {
// 			return;
// 		}
// 		this.props.onHandleSubmit(this.state.input)
// 		dispatch(GetStock(this.state.input))
// 		this.setState({input: ""})
// 	}
    
//  render() {

//      return (
//         <div id="addbox" className="tiles">
//             <input type="text" onChange={this.handleInputChange} onKeyUp={this.handleSubmit} placeholder="Enter Stock Symbol"/>
//             <button onClick={this.onClickHandleSubmit} >Add</button>
//         </div>
//      )
  
//  }
// }

// AddBox = connect()(AddBox)

// export default AddBox;