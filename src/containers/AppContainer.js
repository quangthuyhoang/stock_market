import { connect } from 'react-redux';
import App from '../components/App';
import * as actions from '../actions/actions';
import {bindActionCreators} from 'redux';

function mapStateToProps (state) {

    return {
        data: state.stockListReducer.data,
        option: state.stockListReducer.option
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({ 
    handleSubmit: bindActionCreators(actions.GetStock, dispatch),
    del: bindActionCreators(actions.DeleteStock, dispatch),
    typeSelect: bindActionCreators(actions.UpdateStockType, dispatch),
    xAxis: bindActionCreators(actions.UpdateTime, dispatch)
})

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;