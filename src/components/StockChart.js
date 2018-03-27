import React, { Component } from 'react';
import chartOption from '../methods/StockChart.options';
import '../App.css';
import {Line} from 'react-chartjs-2';
const getChartDataSet = require('../methods/commons').chartDataSet;
const getRandomColor = require('../methods/commons').getRandomColor;
const getStockTypeArr  = require('../methods/commons').getStockTypeArr;


class StockChart extends Component {
    constructor(props) {
        super(props);
    }
//   It may be possible to zoom in view of timeline of stock if we decrease interval length and increase div width and
//      add scroll bar... check if that is possible with chartjs
    render() {
        var chartDataSet    = [],
            newData         = {labels: this.props.xAxis};
            
        if(this.props.data.length > 0) {

            let rawData = this.props.data;

            for(let i = 0 ; i < rawData.length; i++) {
                const stock = getChartDataSet(
                    rawData[i].symbol, 
                    getStockTypeArr(rawData[i].data, this.props.stockType), 
                    rawData[i].info.color)
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