import { connect } from 'react-redux';
import App from '../App';
import * as actions from '../actions/actions';
import {bindActionCreators} from 'redux';

function mapStateToProps (state) {

    return {
        data: state.stockListReducer.data,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({ 
    handleSubmit: bindActionCreators(actions.GetStock, dispatch),
    del: bindActionCreators(actions.DeleteStock, dispatch)
})

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;