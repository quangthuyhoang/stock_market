const nasdaq = require('../reference/nasdaqStockInfo');

export function checkStatus(response) {
    if(response.status !== 200 || !response.ok) {
        console.log("There's been a bad request or response");
        return;
      }
      
    if(response.status === 200 || response.ok) {
        return response.json();
    }
}

export function fetchData(fn, interval, symbol) {

    const supportedFunction = ['TIME_SERIES', 'DIGITAL_CURRENCY'];
    const supportedInterval = ['DAILY', 'WEEKLY', 'MONTHLY'];
    const key = process.env.REACT_APP_stockAPIKey;
    
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

    if(!matchAny(fn, supportedFunction) || !matchAny(interval, supportedInterval)) {
        console.log("Error", fn, "function or", interval, "is not supported.")
        throw "Error - not supported"
    }

    const url = "https://www.alphavantage.co/query?function="+ fn + "_" + interval + "&symbol=" + symbol + '&outputsize=full&apikey=' + key;
    return fetch(url)
}

export function parser(data) {
    // Error handler
    if(!data || typeof data !== 'object' || !data["Meta Data"] ) {
        return;
    }

    // Declares variables & constants
    const refLimit = {'(DAILY)': 262, 'WEEKLY': 52, 'MONTHLY': 12};
    const refArr = Object.keys(refLimit) //currently not used
    const intLen = Object.keys(data)[1]; //currently not used
    const limit = refLimit["(DAILY)"]
    const timeSeries = data[intLen];
    const keyDates = Object.keys(timeSeries).splice(0,limit);
    var arr = [];
    
    // Create final parsed object
    if(keyDates.length > 1) {
        for(var i = 0; i < keyDates.length; i++) {
            arr.push({dates: keyDates[i], stock: timeSeries[keyDates[i]]})
        }
    }

    const init = {symbol: data["Meta Data"]['2. Symbol'], info: createCompany(data["Meta Data"]['2. Symbol'])};   
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

export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function timeSeries(arr , option) { //interval & scope
    console.log(arr)
    // Error handlers
    if(!arr) {
        console.log("Error: timeseries array input.")
        return;
    }
    if(!option) {
        option = {
            interval: "(DAILY)",
            scope: "1Y"
        }
    }
 
    const len = arr.length;
    const stocks = arr;
    var data = stocks.map(function(stock) {
        
        if(stock.dates.split("-")[1][0] === "0") {
            return stock.dates.split("-")[1][1] + "." +stock.dates.split("-")[2] + "." + stock.dates.split("-")[0] // year + "." + stock.dates.split("-")[0]
        }
        return stock.dates.split("-")[1] + "." +stock.dates.split("-")[2] + "." + stock.dates.split("-")[0] // year+ "." + stock.dates.split("-")[0]
    });

    return data;
}