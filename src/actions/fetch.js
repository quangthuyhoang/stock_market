const env = require('../env');
const nasdaq = require('../reference/nasdaqStockInfo');

export function checkStatus(response) {
    if(response.status !== 200 || !response.ok) {
        console.log("There's been a bad request or response");
        return;
      }
      
    if(response.status === 200 || response.ok) {
        console.log("checkstatus",response)
        return response.json();
    }
}

export function fetchData(fn, interval, symbol) {

    const supportedFunction = ['TIME_SERIES', 'DIGITAL_CURRENCY'];
    const supportedInterval = ['DAILY', 'WEEKLY', 'MONTHLY'];
    const key = env.stockAPIKey;
    
    // check function
    if( !fn ) {
        console.log("There's been an error with function input")
        return "Error"
    }
    // check interval
    if( !interval ) {
        console.log("There's been an error with interval")
        return "Error"
    }
    // check symbol
    if( !symbol ) {
        console.log("There's been an error with symbol")
        return "Error"
    }
    // checkkey
    if( !key) {
        console.log("There's been an error with api key", key)
        return "Error"
    }

    // Check if input matches to supported inputs
    // console.log("inside fetch",this)
    if(!matchAny(fn, supportedFunction) || !matchAny(interval, supportedInterval)) {
        console.log("Error", fn, "function or", interval, "is not supported.")
        throw "Error - not supported"
    }

    const url = "https://www.alphavantage.co/query?function="+ fn + "_" + interval + "&symbol=" + symbol + '&outputsize=full' + "&apikey=" + key;
    // const url1 = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=full&apikey=7LTFIJMN4W4GZFOT"
    return fetch(url)
}

export function parser(data) {
    // Error handler

    if(!data || typeof data !== 'object' || !data["Meta Data"] ) {
        return;
    }

    // Declares variables & constants
    const refLimit = {'(DAILY)': 262, 'WEEKLY': 52, 'MONTHLY': 12};
    const refArr = Object.keys(refLimit)
    const intLen = Object.keys(data)[1];
    // const findint = intLen.split(" ")

    // const limit = refLimit[intLen.split(" ")[0].toUpperCase()];
    const limit = refLimit["(DAILY)"]
    // console.log("inside parser - intLen",intLen.split(" ")[0])
   
    const timeSeries = data[intLen];
    const keyDates = Object.keys(timeSeries).splice(0,limit);
    var arr = [];
    
    // Create final parsed object
    if(keyDates.length > 1) {
        for(var i = 0; i < keyDates.length; i++) {
            arr.push({dates: keyDates[i], stock: timeSeries[keyDates[i]]})
        }
    }

    const init = {symbol: data["Meta Data"]['2. Symbol']};   
    init.data = arr.reverse();

    return init;
}

export function matchAny(str, arr) {
    if(!str || arr.length < 2 ) {
        console.log("Error: no input for matchAny function")
    return;
    }
    for(let i = 0; i < arr.length; i++) {
        if(str.toUpperCase() === arr[i].toUpperCase()) {
            return true;
        }
    }
    return false;
}

export function createCompany(ticker) {
      
    for(let i = 0; i < nasdaq.length; i++ ) {
        if(nasdaq[i].symbol === ticker) {
            return nasdaq[i]
        }
    }
    return {error: "Could not find matching result"}
}