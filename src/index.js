// import 'babel-polyfill' from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import {GetStock, DeleteStock, fetchStock, GetStockSuccess,} from './actions/actions'
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers/reducer';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
const nasdaq = require('./reference/nasdaqStockInfo');

const listr = [
    {_id: 0, "symbol":"MSFT","name":"Microsoft Corporation","sector":"Technology","industry":"Computer Software: Prepackaged Software", data: [], color: "#e22626"}
  ]
  
const xAxis = ["1.14", "1.21", "1.28", "2.04", "2.11", "2.18", "2.25", "3.03", "3.10", "3.17", "3.24", "3.31", "4.07", "4.14", "4.20", "4.28", "5.05", "5.12", "5.19", "5.26", "6.02", "6.09", "6.16", "6.23", "6.30", "7.07", "7.14", "7.21", "7.28", "8.04", "8.11", "8.18", "8.25", "9.01", "9.08", "9.15", "9.22", "9.29", "10.06", "10.13", "10.20", "10.27", "11.03", "11.10", "11.17", "11.24", "12.01", "12.08", "12.15", "12.22", "12.29", "1.05", "1.12", "1.19", "1.26", "2.02", "2.09", "2.16", "2.23", "3.02", "3.09", "3.16", "3.23", "3.30", "4.06", "4.12", "4.20", "4.27", "5.04", "5.11", "5.18", "5.25", "6.01", "6.08", "6.15", "6.22", "6.29", "7.06", "7.13", "7.20", "7.27", "8.03", "8.10", "8.17", "8.24", "8.31", "9.07", "9.10", "9.21", "9.28", "10.05", "10.12", "10.19", "10.26", "11.02", "11.09", "11.16", "11.23", "11.30", "12.07"]

const initState = {
    companyList: listr,
    data: [],
    xAxis: xAxis,
    option: {
      intervalLength: "DAILY",
      viewScope: "year",
      refType: "close",
      xAxis: "TIME_SERIES"
    }
}

const middleware = [thunk, createLogger()]

const store = configureStore(initState) 
console.log(store.getState())
// const store = createStore(reducer, initState, applyMiddleware(...middleware))
console.log(store.dispatch(GetStock('MMM')))
console.log(store.dispatch(GetStock('COKE')))
console.log(store.dispatch(GetStock('TSLA')))
setTimeout(()=> {return console.log(store.dispatch(DeleteStock(0)), store.getState())}, 5000)
// console.log(store.dispatch(GetStock('AAPL')))




ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
