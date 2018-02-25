import React, { Component } from 'react';
import chartOption from './StockChart.options';
import './App.css';
import {Line} from 'react-chartjs-2';
const toTimeSeries = require('./commons').timeSeries;
const toChartDataSet = require('./commons').chartDataSet;
const getRandomColor = require('./commons').getRandomColor;
const getStockDataType = require('./commons').getStockDataType;


class StockChart extends Component {
    constructor(props) {
        super(props);
    }
    // convert list of data to a single array
    // with Chart Data set Object
    chartDataHandler(stocktype) {
        var stock = this.props.stockList;
        var data = this.props.data;
        
        // console.log("chart data handler inside stockChart", "stock", stock, "data", data)
        var output = [];

        // Check if length is same
        if(stock.length !== data.length) {
            console.log("different length")
            return;
        }
        // console.log(stock[0].symbol, data.symbol)
        // Check if symbols in both list match
        for(let i = 0; i < stock.length; i++) {
            for(let j = 0; j < data.length; j++) {
                if(stock[i].symbol === data[j].symbol) {
                    // create single dataset array
                    var chartData = getStockDataType(data[j].data, stocktype)
                    console.log("matched found", "symbol", data[j].symbol, "data", chartData)
                    output.push(toChartDataSet(data[j].symbol, chartData, getRandomColor()))
                }
            }
        }
        console.log("final chartdatahandler output",output)
        return output;
    }




    chartDataSet(company, data, color) {

        var dataset = toChartDataSet(company, data, color)

        return dataset;
    }

    updateData() {

         var labels = this.props.xAxis
        

         const dataset = []
         dataset.push(this.chartDataSet("facebook", [15, 19, 29, 11, 16, 35, 40, 55, 6, 10], "blue"));
    
        dataset.push(this.chartDataSet("MFST", this.props.data.data, this.props.data.backgroundColor));
         var newData = {labels: labels, datasets: dataset};
     
         this.setState({newData: newData}, function() {
             console.log("updateData", this.state.newData)
         })
    }

    
    render() {
        console.log("inside stockchart, data", this.props.data)
        const dataset2 = this.chartDataHandler("close")
        console.log("inside stockchart, data2",dataset2)
        const dataset = []
        dataset.push(this.chartDataSet("facebook", [15, 19, 29, 11, 16, 35, 40, 55, 6, 10], "blue"));
      
        dataset.push(this.chartDataSet(this.props.data.label, this.props.data.data, this.props.data.backgroundColor));
        var newData = {labels: this.props.xAxis, datasets: dataset2};
      console.log("newData",newData, "dataset2", dataset2)
        return (
        <div id="stockchart" className="left">
            <Line data={newData} options={chartOption.op1}/>
            {/* <Line data={newData} options={chartOption.op1}/> */}
        </div>
        )
     
    }
   }
   
export default StockChart;