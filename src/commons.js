require('dotenv').config({path: '../'})


function resolved(result) {
    console.log("Issue has been resolved");
    return result;
}

function rejected(result) {
    console.log("error:", result)
}


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


    self.gen = function() {
        return {
            label: self.label,
            fill: false,
            lineTension: 0.1,
            backgroundColor: self.color,
            borderColor: self.color,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: self.color,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: self.data
        }
    }
}



module.exports = {

    test: function(input) {
        console.log("test",input);
        return input;
    },

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

    toArray: function(data) {
        var arr = []
        if(!data) {
            return;
        }

        const init = {symbol: data["Meta Data"]['2. Symbol']};        
        const weeklyTimeSeries = data["Weekly Time Series"];
        const keyDates = Object.keys(weeklyTimeSeries).sort();
        
        if(keyDates.length > 1) {
            arr.push(init);
            for(var i = 0; i < keyDates.length; i++) {
                arr.push({dates: keyDates[i], stock: weeklyTimeSeries[keyDates[i]]})
            }
        }
        return arr;
    },

    // Converts array of incoming time series to shorter format 'm.dd' ex Jan 30 => 1.30
    timeSeries: function(arr) {
        const len = arr.length;
        const stocks = arr.slice(1, len + 1)
        var data = stocks.map(function(stock) {
            if(stock.dates.split("-")[1][0] === "0") {
                return stock.dates.split("-")[1][1] + "." +stock.dates.split("-")[2]
            }
            return stock.dates.split("-")[1] + "." +stock.dates.split("-")[2]
        });

        return data;
    },
    
    // converts incoming array to numbers array
    isNumber: function(arr) {
        return arr.map((el) => {
            return Number(el);
        })
    },

    // returns dataset object to be used in chart
    chartDataSet: function(label, ydata, color) {
        var dataset = new Dataset(label, ydata, color)
        return dataset;
    },

    // Check if str matches any in array
    matchAny: function(str, arr) {
        for(let i = 0; i < arr.length; i++) {
            if(str.toUpperCase() === arr[i].toUpperCase()) {
                return true;
            }
        }
        return false;
    },

    // get data from 
    getData: function(fn, interval, symbol) {

        const supportedFunction = ['TIME_SERIES', 'DIGITAL_CURRENCY'];
        const supportedInterval = ['DAILY', 'WEEKLY', 'MONTHLY'];
        const key = process.env.stockAPIKey;
        console.log(process.env.stockAPIKey)

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
        if(!this.matchAny(fn, supportedFunction) || !this.matchAny(interval, supportedInterval)) {
            console.log("Error", fn, "function or", interval, "is not supported.")
            throw "Error - not supported"
        }

        const url = "https://www.alphavantage.co/query?function="+ fn + "_" + interval + "&symbol=" + symbol + "&apikey=" + key;
        return fetch(url)
        // .then(checkstatus)
        // .then( (data) => {
            
        //     if(!data) {
        //         console.log("data fail")
        //         return;
        //     }

        //     console.log("successfully got data", data.json())
        //     return data.json;
        // })
    }
}