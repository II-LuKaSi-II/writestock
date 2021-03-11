const async = require('async');
const moment = require('moment');

const {
    getStockInfo, getHistoricalPriceInfoByDate
} = require("./iexapis.helper");

module.exports = {
    addStockInfoOnArticles
}

/**
 * Adds stock information on articles
 * @param {*} articles 
 * @returns 
 */
function addStockInfoOnArticles (articles) {
    return new Promise((resolve, reject) => {
        let result = [];
        console.log(articles.length)
        async.eachSeries(articles, async (article) => {
            console.log(article.articleTicker)
            let stockInfo = await getStockInfo(article.articleTicker);
            const date = moment(article.createdAt).format("YYYYMMDD");
            let stockHistoryInfo = await getHistoricalPriceInfoByDate(article.articleTicker, date)
            result.push({
                ...article,
                stock: stockInfo,
                history: stockHistoryInfo
            });
        }, (error) => {
            console.log(error)
            resolve(result); 
        });
    });  
}