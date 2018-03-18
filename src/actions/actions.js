import commons from '../commons';
import { fetchData, parser, checkStatus, createCompany } from './fetch'
const nasdaq = require('../reference/nasdaqStockInfo');

export function GetStockSuccess(stock) {
    if(stock) {
        console.log("inside getstock success",stock)
    }
    return {
            type: 'GET_STOCK_SUCCESS',
            data: stock
        }
}

// export function fetchStock(symbol) {
//     return (dispatch) => {
//         return fetchData('TIME_SERIES', 'DAILY', symbol)
//         .then( res => res.json())
//         .then(
//             res => dispatch(GetStockSuccess(res))
//         )
//     }
// }

export function GetStock(symbol) {

    return function(dispatch) {
        return fetchData('TIME_SERIES', 'DAILY', symbol)
        .then(checkStatus).then(parser).then(res => {
            const info = createCompany(res.symbol)
            res.info = info;
   
            console.log("res",res)
            dispatch(GetStockSuccess(res))
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

