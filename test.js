const assert = require('chai').assert;
const commons = require('./src/commons');
const seed = require('./src/reference/seed');

var toObjResult = commons.parser(seed); // get initial data obj from fetch
var timeSeriesResult = commons.timeSeries(toObjResult.data)
const timeSeriesLength = timeSeriesResult[0].length;
const dataTypeResult = commons.getStockDataType(toObjResult.data, 'close')

var chartDataSetResult = commons.chartDataSet("testname", [1,2,3,4,5], "yellow"); 

// const getDataResult = commons.getData("TIME_SERIES", "DAILY", "MFST").length
const createCompanyResult = commons.createCompany('TSLA');
const colorGenResult = commons.getRandomColor();


describe("commons", function() {
    describe("parser function", function() {
        it('Should return an obj', function() {
            assert.typeOf(toObjResult, "Object")
        });

        it('Should stock symbol', () => {
            assert.containsAllKeys(toObjResult, ["symbol"])
        });

        it('Should contain two key values of dates and stock', () => {
            assert.containsAllKeys(toObjResult.data[0], ["dates", "stock"])
        });

        it('Should have a length equal to 52', () => {
            assert.lengthOf(toObjResult.data, 52)
        });
    })

    describe("toDataType function", function() {
        it("Should return an array type", () => {
            assert.typeOf(dataTypeResult, 'Array')
        });

        it('Should have use a specific close type', () => {
            assert.equal(dataTypeResult[0], 92.66)
        })
    })

    describe("chartDataSet function", ()=> {
        it('Should return an object', () => {
            assert.typeOf(chartDataSetResult, "Object")
        });

        it('Should have a data array length of 5', ()=> {
            assert.lengthOf(chartDataSetResult.data, 5)
        });

        it('Should have testname for label', () => {
            assert.equal(chartDataSetResult.label, "testname")
        })
    })

    describe("timeSeries function", () => {
        it('Should have element string with length less than 6', () => {
            assert.isBelow(timeSeriesLength, 6)
        })
    })

    describe("createCompany function", function() {
        it("Should return a company name", () => {
            assert.equal(createCompanyResult.name.trim(), 'Tesla, Inc.')
        })
    })

    

    // describe("getData function", () => {
    //     it('Should return a promise', () => {
    //         assert.equal(getDataResult, 1000)
    //     })
    // })
})