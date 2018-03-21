import commons from '../commons';
import { fetchData, parser, checkStatus, createCompany } from './fetch'
const nasdaq = require('../reference/nasdaqStockInfo');

export function handleInputChange(txt) {
    return {
        type: 'INPUT_CHANGE',
        input: txt
    }
}



export function GetStockSuccess(stock) {
    return {
            type: 'GET_STOCK_SUCCESS',
            data: stock
        }
}

export function GetStockFailure() {
    return {
            type: 'GET_STOCK_FAILURE'
        }
}

function UpdateList(symbol) {
    return {
        type: 'UPDATE_LIST',
        symbol: symbol
    }
}

export function GetStock(symbol) {
    if(symbol.length === 0) {
        return function(dispatch) {
            dispatch(GetStockFailure())
        }
    }
    // check if symbol exist
    const info = createCompany(symbol)
    // ON ERROR
    if(info.error) {
        return function(dispatch) {
            dispatch(GetStockFailure())
        }
    }
    // ON SUCCESS
    return function(dispatch) {
        return fetchData('TIME_SERIES', 'DAILY', symbol)
        .then(checkStatus).then(parser).then(res => {
            res.info = info;
            dispatch(GetStockSuccess(res))
            // dispatch(UpdateList(res.symbol))
        })
    }
}

export const test = (symbol) => (dispatch, getState) => {
    return dispatch(GetStock(symbol))
}

export function DeleteStockSuccess(id) {
    return {
        type: 'DELETE_STOCK_SUCCESS',
        _id: id
    }
}

export function DeleteStock(id) {
    return (dispatch) => {
        dispatch(DeleteStockSuccess(id))
    }
}
