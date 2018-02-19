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
        var arr = [];
        const weeklyTimeSeries = data["Weekly Time Series"].sort();
        const len = weeklyTimeSeries.length;
        const keyDates = Object.keys(weeklyTimeSeries);
        for(var i = 0; i < len; i++) {
        //    arr.push({weeklyTimeSeries[keyDates[i]]
        }
        const values = Object.values(data["Weekly Time Series"]);
        console.log("values", values)
        return {dates: dates, stock: values}
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