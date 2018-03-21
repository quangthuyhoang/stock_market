import { createStore, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
// Redux thunk need to be added as middleware to allow async function calls
import  thunk from 'redux-thunk';


// import reducer
import stockApp from '../reducers/reducer';

export function configureStore() {
    return createStore(
        stockApp,
      
        applyMiddleware(thunk, createLogger())
    )
}