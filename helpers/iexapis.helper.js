const request = require('request');

module.exports = {
    getStockInfo,
    getHistoricalPriceInfoByDate
}

/**
 * Get Stock Information from iexapis
 * 
 * @param {*} tick 
 * @returns 
 */
async function getStockInfo (tick) {
    return new Promise((resolve, reject) => {
        request(`https://cloud.iexapis.com/stable/stock/${tick}/quote?token=pk_32b83d1e7ecb4c229b342146677133aa`, { json: true }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode === 200) {
                resolve(body);
            }
            else {
                resolve(null);
            }
        });
    });
}


async function getHistoricalPriceInfoByDate (tick, date) {
    return new Promise((resolve, reject) => {
        request(`https://cloud.iexapis.com/stable/stock/${tick}/chart/date/${date}?chartByDay=true&token=pk_32b83d1e7ecb4c229b342146677133aa`, { json: true }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode === 200) {
                resolve(body);
            }
            else {
                resolve([]);
            }
        });
    });
}