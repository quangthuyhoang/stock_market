module.exports = {
    op1: {
        legend: {
            labels: {
                fontColor: "white",
                fontSize: 18,
                fontStyle: 'Poiret One',
            }
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    // labelString: 'INDICES',
                    fontColor: "white"
                },
                // gridLines: {
                //     color: "rgba(0, 0, 0, 0)",
                // },
                ticks: {
                    fontColor: "white",
                    autoSkip: false
                }
            }],
            xAxes: [{
                type: 'time',
                time: {
                    // unit: 'week',
                    // displayFormat: {
                    //     month: 'MMM YY' 
                    // }
                },
                ticks: {
                    fontColor: "white",
                    fontSize: 14,
                    stepSize: 1,
                    fontStyle: 'Poiret One',
                    callbacks: function(value, index, values) {
                        console.log("Hello skfjsldkfj")
                        return '$' + value;
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Time',
                    fontColor: "white",
                    // minRotation = 90
                },
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
            }]
        },

        tooltips: {
            custom: function(tooltip) {
                if (!tooltip) return;
                // disable displaying the color box;
                tooltip.displayColors = false;
              },
            callbacks: {
                title: function(tooltipItem, data) {
                    var xLabel = tooltipItem[0].xLabel
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const d = new Date(tooltipItem[0].xLabel)
                    const dayName = days[d.getDay()]
                    return dayName + ", " + xLabel.replace(".","-").replace(".","-");
                },
                // title: function(tooltipItems, data) {
                //     console.log("title",data)
                //     return data.datasets[tooltipItems[0].datasetIndex].label + ' ';
                //   },
                label: function(tooltipItem, data, i) {
                    return  data.datasets[tooltipItem.datasetIndex].label + ' : ' + tooltipItem.yLabel;
                },
            }
        }
    }
}