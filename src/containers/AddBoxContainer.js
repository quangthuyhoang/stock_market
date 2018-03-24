import { connect } from 'react-redux';
import AddBox from '../components/AddBox';
import * as actions from '../actions/actions';

function mapStateToProps(state, ownPros) {
    return {
      input: state.input
    }
  }
  // allow us to use actions dispatch to be passed down as props
  function mapDispatchToProps(dispatch) {
    return {
		handleInputChange: (input) => { 
			dispatch(actions.handleInputChange(input)) 
		},
		handleSubmit: (txt) => { dispatch(actions.GetStock(txt)) }
    }
  }


const AddBoxContainer = connect(mapStateToProps, mapDispatchToProps)(AddBox)


export default AddBoxContainer;