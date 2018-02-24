const assert = require('chai').assert;
const commons = require('./src/commons');
const seed = require('./src/reference/seed');

var toArrayResult = commons.toArray(seed);
var chartDataSetResult = commons.chartDataSet("testname", [1,2,3,4,5], "yellow");
var timeSeriesResult = commons.timeSeries(toArrayResult)
const timeSeriesLength = timeSeriesResult[0].length;
// const getDataResult = commons.getData("TIME_SERIES", "DAILY", "MFST").length
const createCompanyResult = commons.createCompany('TSLA');

describe("commons", function() {
    describe("toArray function", function() {
        it('Should return an array', function() {
            assert.typeOf(toArrayResult, "Array")
        });

        it('Should stock symbol', () => {
            assert.containsAllKeys(toArrayResult[0], ["symbol"])
        });

        it('Should contain two key values of dates and stock', () => {
            assert.containsAllKeys(toArrayResult[1], ["dates", "stock"])
        });

        it('Should have a length equal to 946', () => {
            assert.lengthOf(toArrayResult, 946)
        });
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