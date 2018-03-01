const env = require('./env');
const nasdaq = require('./reference/nasdaqStockInfo');

function resolved(result) {
    console.log("Issue has been resolved");
    return result;
}

function rejected(result) {
    console.log("error:", result)
}

function matchAny(str, arr) {
    if(!str  ) {
        console.log("Error: no input for matchAny function")
        return;
    }

    for(let i = 0; i < arr.length; i++) {
        if(str.toUpperCase() === arr[i].toUpperCase()) {
            return true;
        }
    }
    return false;
};


function checkstatus(response) {
    if(response.status !== 200 || !response.ok) {
        console.log("There's been a bad request or response");
        return;
      }
      
    return response.json();
}
var Dataset = function(label, data, color) {

    var self = this;
    self.label = label || "No label was entered";
    self.data = data || [] ;
    self.fill= false;
    self.lineTension= 0.1;
    self.backgroundColor= color || 'rgba(75,192,192,1)';
    self.borderColor= color || 'rgba(75,192,192,1)';
    self.borderCapStyle= 'butt';
    self.borderDash= [];
    self.borderDashOffset= 0.0;
    self.borderJoinStyle= 'miter';
    self.pointBorderColor= color || 'rgba(75,192,192,1)';
    self.pointBackgroundColor= color || 'rgba(75,192,192,1)';
    self.pointBorderWidth= 1;
    self.pointHoverRadius= 5;
    self.pointHoverBackgroundColor= 'rgba(75,192,192,1)';
    self.pointHoverBorderColor= 'rgba(220,220,220,1)';
    self.pointHoverBorderWidth= 2;
    self.pointRadius= 1;
    self.pointHitRadius= 10;

    // methods
    self.updateLabel = function(label) {
        self.label = label
    };

    self.updateData = function(data) {
        self.data = data;
    }

    self.updateColor = function(color) {
        self.backgroundColor= color;
        self.borderColor = color;
        self.pointBorderColor = color;
        self.pointBackgroundColor= color;
    }
}



module.exports = {

    checkStatus: function(response) {
        if(response.status !== 200 || !response.ok) {
            console.log("There's been a bad request or response");
            return;
          }
          
        if(response.status === 200 || response.ok) {
            console.log("checkstatus",response)
            return response.json();
        }
        
    },

    parser: function(data) {
        // Error handler
        console.log("inside parser",data)
        if(!data || typeof data !== 'object' || !data["Meta Data"] ) {
            return;
        }

        // Declares variables & constants
        const refLimit = {'DAILY': 365, 'WEEKLY': 52, 'MONTHLY': 12};
        const intLen = Object.keys(data)[1];
        const limit = refLimit[intLen.split(" ")[0].toUpperCase()];
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
        init.data = arr;
  
        return init;
    },

    // Converts array time series to shorter format 'm.dd' ex Jan 30 => 1.30
    timeSeries: function(arr) {
     
        const len = arr.length;
        const stocks = arr;
        var data = stocks.map(function(stock) {
            
            if(stock.dates.split("-")[1][0] === "0") {
                return stock.dates.split("-")[1][1] + "." +stock.dates.split("-")[2] // year + "." + stock.dates.split("-")[0]
            }
            return stock.dates.split("-")[1] + "." +stock.dates.split("-")[2] // year+ "." + stock.dates.split("-")[0]
        });
   
        return data;
    },
    
    // converts incoming array to numbers array
    isNumber: function(arr) {
        return arr.map((el) => {
            return Number(el);
        })
    },

     // Check if str matches any in array
     matchAny: function(str, arr) {
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
    },

    // returns dataset object to be used in chart
    chartDataSet: function(label, ydata, color) {
        var dataset = new Dataset(label, ydata, color)
        return dataset;
    },

    createCompany: function(ticker) {
      
        for(let i = 0; i < nasdaq.length; i++ ) {
            if(nasdaq[i].symbol === ticker) {
                return nasdaq[i]
            }
        }

        return {error: "Could not find matching result"}
    },

    getRandomColor: function() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    getStockDataType: function(arr, type) {
        console.log("inside getStockDatatype func", "type", type, arr)
        // Acceptable type values
        const refType = ['open', 'high','low', 'close', 'volume', 'OHLC'];
        const refNum = ["1. ", "2. ", "3. ", "4. ", "5. "]
        // Verifies input type
        // console.log("inside getstockdatatype",this)
        if(!matchAny(type.toLowerCase(), refType)) {
            console.log("Inside getStockDataType function: input type did not match stock data type.")
            return;
        }
        
        var newArr = [];

        // *** FOR POTENTIAL FUTURE USE ****
        // if(type === 'OHLC') {
        //     arr.map(function(interval) {
        //         for(let i = 0; i < 4; i++) {
        //            var k = refNum[i] + refType[i];
        //            interval[k]
        //         }
        //         return interval.stock
        //     })
        //     return;
        // }
             // *** ******* ****

        const  k = refNum[refType.indexOf(type)] + type;

        // create final array of stock data for specific type
        for(let i = 0; i < arr.length; i++) {
            newArr.push(parseFloat(arr[i].stock[k]))
        }

        return newArr
    },

    // get data from 
    fetchData: function(fn, interval, symbol) {

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
        console.log("inside fetch",this)
        if(!this.matchAny(fn, supportedFunction) || !this.matchAny(interval, supportedInterval)) {
            console.log("Error", fn, "function or", interval, "is not supported.")
            throw "Error - not supported"
        }

        const url = "https://www.alphavantage.co/query?function="+ fn + "_" + interval + "&symbol=" + symbol + "&apikey=" + key;

        return fetch(url)
        // .then(this.checkStatus)
        // .then(this.parser)
        // .catch(function(err) {
        //     console.log("Error", err)
        // })
    }
}