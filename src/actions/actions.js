import commons from '../commons';
import { fetchData, parser, checkStatus } from './fetch'
const env = require('../env');
const nasdaq = require('../reference/nasdaqStockInfo');


export function fetchStock(symbol) {
    return function (dispatch, getState) {
       
        const request = fetchData('TIME_SERIES', 'DAILY', symbol)

        return request.then(checkStatus)
        .then(parser)
        .then(res => {
            dispatch(GetStockSuccess(res))
        })
    }
}

export function GetStock(symbol) {
    return (dispatch) => {
        return fetchData('TIME_SERIES', 'DAILY', symbol).then(checkStatus).then(parser).then(res => {
            console.log("res",res)
            return dispatch(GetStockSuccess(res))
        })
    }
}

export function DeleteStockSuccess(stock) {
    return {
        type: 'DELETE_STOCK_SUCCESS',
        stock,
        _id: stock._id
    }
}

export function DeleteStock(stock) {
    return (dispatch, getState) => {
        dispatch(DeleteStockSuccess(stock))
    }
}

