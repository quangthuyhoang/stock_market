const assert = require('chai').assert;
const commons = require('./src/commons');
const seed = require('./src/seed');


var toArrayResult = commons.toArray(seed)

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
})