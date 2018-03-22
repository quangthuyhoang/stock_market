import React, { Component } from 'react';
import chartOption from './StockChart.options';
import './App.css';
import {Line} from 'react-chartjs-2';
const toTimeSeries = require('./commons').timeSeries;
const toChartDataSet = require('./commons').chartDataSet;
const getRandomColor = require('./commons').getRandomColor;
const getStockTypeArr = require('./commons').getStockTypeArr;


class StockChart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    // with Chart Data set Object
    chartDataHandler(stocktype) {
        var stock = this.props.stockList, data = this.props.data, output = [];

        // Check if length is same
        if(stock.length !== data.length) {
            console.log("different length")
            return;
        }
  
        // Check if symbols in both list match
        for(let i = 0; i < stock.length; i++) {
            for(let j = 0; j < data.length; j++) {
                if(stock[i].symbol === data[j].symbol) {
                    // create single dataset array
                    var chartData = getStockTypeArr(data[j].data, stocktype)
                    // console.log("matched found", "symbol", data[j].symbol, "data", chartData, stock[j].color)
                    output.push(toChartDataSet(data[j].symbol, chartData, stock[j].color))
                }
            }
        }

        return output;
    }

    labelMaker() {
        var data = this.props.data;
        
    }


    
    render() {
        var chartDataSet = [], newData = {labels: this.props.xAxis};
        if(this.props.data.length > 0) {
            console.log("data",this.props.data)
            var chartDataSet = this.props.data.map(function(stock) {
                return toChartDataSet(stock.info.symbol, getStockTypeArr(stock.data, 'close'),)
            })

            newData.datasets = chartDataSet;
        }
        
        console.log("chartdataset", chartDataSet)
        const dataset2 = this.chartDataHandler(this.props.stockType)
        // var newData = {labels: this.props.xAxis};

        return (
        <div id="stockchart" className="left">
            <Line data={newData} options={chartOption.op1}/>
        </div>
        )
     
    }
   }
   
export default StockChart;