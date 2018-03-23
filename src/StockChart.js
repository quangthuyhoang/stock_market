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

    createChartDataSet(type) {
        return toChartDataSet()
    }
  
    render() {
        var chartDataSet    = [],
            newData         = {labels: this.props.xAxis};
            
        if(this.props.data.length > 0) {
            
            let rawData = this.props.data;

            for(let i = 0 ; i < rawData.length; i++) {
                const stock = toChartDataSet(rawData[i].symbol, getStockTypeArr(rawData[i].data, this.props.stockType), rawData[i].info.color)
                chartDataSet.push(stock)
            }
            newData.datasets = chartDataSet;
        }
        
        return (
        <div id="stockchart" className="left">
            <Line data={newData} options={chartOption.op1}/>
        </div>
        )
     
    }
   }
   
export default StockChart;