
const nasdaq = require('./reference/nasdaqStockInfo');
const commons = require('./commons');

module.exports = {
    isSymListed: function(sym, list) {
        const len = list.length;
        for(let i = 0; i < len; i++) {
            if(list[i].symbol === sym) {
                return true;
            }
        }
        return false;
    }
}