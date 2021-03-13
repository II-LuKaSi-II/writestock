const async = require('async');
const moment = require('moment');

const {
    getStockInfo
} = require("./iexapis.helper");

module.exports = {
    addStockInfoOnWeeklyTrendingStocs
}

/**
 * Adds stock information on weekly trending stocks
 * @param {*} stocks 
 * @returns 
 */
function addStockInfoOnWeeklyTrendingStocs (stocks) {
    return new Promise((resolve) => {
        let result = [];
        async.eachSeries(stocks, async (stock) => {
            let stockInfo = await getStockInfo(stock.ticker);
            result.push({
                ...stock,
                stock: stockInfo
            });
        }, (error) => {
            resolve(result); 
        });
    });  
}