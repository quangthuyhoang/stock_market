import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const nasdaq = require('./reference/nasdaqStockInfo');

console.log(nasdaq[1].symbol)
const url = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&apikey=demo"
ReactDOM.render(<App url={url}/>, document.getElementById('root'));
registerServiceWorker();
