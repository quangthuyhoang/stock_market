module.exports = {
    op1: {
        legend: {
            labels: {
                fontColor: "white",
                fontSize: 18
            }
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'INDICES',
                    fontColor: "white"
                },
                // gridLines: {
                //     color: "rgba(0, 0, 0, 0)",
                // },
                ticks: {
                    fontColor: "white",
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Time',
                    fontColor: "white",
                },
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                    fontColor: "white",
                    fontSize: 14,
                    // stepSize: 1,
                    // beginAtZero: true
                }
            }]
        }
    }
}