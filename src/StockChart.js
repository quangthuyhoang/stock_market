import React, { Component } from 'react';
import chartOption from './StockChart.options';
import './App.css';
import {Line} from 'react-chartjs-2';
const toTimeSeries = require('./commons').timeSeries;
const toChartDataSet = require('./commons').chartDataSet;


class StockChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'MFST',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,19,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40]
                  },
                  {
                    label: 'FB',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,19,1)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,19,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [6, 80, 80, 1, 56, 55, 40]
                  }
                ],
                options: {}
            },

            newData: {
                labels: "",
                datasets: [
                  {
                    label: "MSFT",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(0,19,19,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40]
                  }
                ]
            }
        }

        this.addLabels = this.addLabels.bind(this);
    }

    componentDidMount() {

        const labels = this.addLabels();
        // var labels = this.timeSeries(this.props.xAxis);
        // console.log("labels alt", this.props.xAxis)
        const dataset = []
        dataset.push(this.chartDataSet("facebook", [15, 19, 29, 11, 16, 35, 40, 55, 6, 10], "blue"));
        // console.log("updating state in stockchart",this.props.data.data)
        dataset.push(this.chartDataSet("MFST", this.props.data.data, this.props.data.backgroundColor));
        var newData = {labels: labels, datasets: dataset};
    
        this.setState({newData: newData}, function() {
            console.log("newData has been set for StockChart", this.state.newData)
        })
    }

    addLabels() {
        console.log("labels", this.props.data)
        // console.log("add ti",toTimeSeries(this.props.data))
        // return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', "September", "October", "November", "December"];
        return ["2000-01-14", "2000-01-21", "2000-01-28", "2000-02-04", "2000-02-11", "2000-02-18", "2000-02-25", "2000-03-03", "2000-03-10", "2000-13-17"];
        // return ["1-1"]
    }

    timeSeries(arr) {
        return arr.map(function(str){
            var strArr = str.split("-");
            if(strArr[1][0] === '0') {
                return strArr[1].slice(1) + "." + strArr[2];
            }
            return strArr[1] + "." + strArr[2];
        })
    }

    chartDataSet(company, data, color) {

        var dataset = toChartDataSet(company, data, color)
        // console.log("chartDataset", dataset);
        return dataset;
    }

    updateData() {
         // const labels = this.addLabels();
         var labels = this.timeSeries(this.addLabels());
        //  console.log("labels alt", this.props.xAxis)
         const dataset = []
         dataset.push(this.chartDataSet("facebook", [15, 19, 29, 11, 16, 35, 40, 55, 6, 10], "blue"));
         dataset.push(this.chartDataSet("telsa", [111.69, 106.25, 89.06, 74.12, 78.94, 69.75, 71.12, 68.81, 65.06, 61.44], "red"))
         var newData = {labels: labels, datasets: dataset};
     
         this.setState({newData: newData}, function() {
             console.log("newData has been set for StockChart", this.state.newData)
         })
    }

    
    render() {
        const dataset = []
        dataset.push(this.chartDataSet("facebook", [15, 19, 29, 11, 16, 35, 40, 55, 6, 10], "blue"));
        // console.log("updating state in stockchart",this.props.data.data)
        dataset.push(this.chartDataSet("MFST", this.props.data.data, this.props.data.backgroundColor));
        var newData = {labels: this.props.data.label, datasets: dataset};
        return (
        <div id="stockchart" className="left">
            <Line data={newData} options={chartOption.op1}/>
        </div>
        )
     
    }
   }
   
export default StockChart;