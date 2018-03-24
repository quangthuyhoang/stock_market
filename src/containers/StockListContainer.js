import { connect } from 'react-redux';
import StockList from '../components/StockList';
import * as actions from '../actions/actions';

function mapStateToProps (state, ownProps) {
    return { stockList: state.companyList, input: state.input , stateInput: this.props}
}
const mapDispatchToProps = (dispatch, ownProps) => ({ 
    handleInputChange: dispatch(actions.handleInputChange),
    handleSubmit: dispatch(actions.GetStock),
    del: dispatch(actions.DeleteStock),
})

const StockListContainer = connect(mapStateToProps, mapDispatchToProps)(StockList);

export default StockListContainer;