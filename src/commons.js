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

    timeSeries: function(arr) {
        const len = arr.length;
        const stocks = arr.slice(1, len + 1)
        var data = stocks.map(function(stock) {
            return stock.dates
            return stock.split("-")[1] + "." +stock.split("-")[2]
        });

        return data;
    },
    
    isNumber: function(arr) {
        return arr.map((el) => {
            return Number(el);
        })
    },

    chartDataSet: function(label, ydata, color) {
        var dataset = new Dataset(label, ydata, color)
        return dataset;
        
    },

    getData: function(url) {
        fetch(url)
        .then(checkstatus)
        .then( (data) => {
            
            if(!data) {
                console.log("data fail")
                return;
            }

            console.log("successfully got data", data.json())
            return data.json;
        })
    }
}