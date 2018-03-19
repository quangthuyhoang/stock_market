import { connect } from 'react-redux';
import StockList from '../StockList';
import * as actions from '../actions/actions';

const mapStateToProps = (state, ownProps) => ({ stockList: state.companyList })
const mapDispatchToProps = (dispatch, ownProps) => ({ 
    handleInputChange: dispatch(actions.handleInputChange),
    handleSubmit: dispatch(actions.GetStock),
    del: dispatch(actions.DeleteStock),
    tst: 
})

const StockListContainer = connect(mapStateToProps, mapDispatchToProps)(StockList);

export default StockListContainer;